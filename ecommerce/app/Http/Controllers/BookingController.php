<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use Illuminate\Support\Facades\Mail;
use App\Models\Booking;
use App\Models\Client;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    // Muestra el formulario de reserva
    public function create(Request $request)
    {
        // Si no está autenticado, redirigir al login y volver aquí después
        if(!auth()->check()) {
            session(['url.intended'=>url()->full()]);
            return redirect()->route('login')
                ->with('info','Por favor, Inicia sesión para continuar con tu reserva 🎒');
        }
        $package = TourPackage::with(['category', 'location', 'hoteles', 'restaurantes','guias'])
            ->findOrFail($request->package_id);

        return Inertia::render('Bookings/Create', [
            'package' => $package
        ]);
    }

    // Guarda la reserva
    public function store(Request $request)
    {
        $request->validate([
            'package_id'       => 'required|exists:tour_packages,id',
            'booking_date'     => 'required|date|after:today',
            'persons_quantity' => 'required|integer|min:1|max:20',
            'include_hotel'    => 'boolean',
            'hotel_id'         => 'nullable|exists:hoteles,id',
            'restaurante_id'   => 'nullable|exists:restaurantes,id',
            'guide_id'         => 'nullable|exists:guias_turisticos,id',
        ]);

        // Buscar o crear el cliente vinculado al usuario
        $client = Client::where('user_id', auth()->id())->first();

        if (!$client) {
            $client = Client::create([
                'user_id'         => auth()->id(),
                'first_name'      => auth()->user()->name,
                'last_name'       => '',
                'document_type'   => 'DNI',
                'document_number' => '00000000',
            ]);
        }

        // Calcular el total
        $package      = TourPackage::with(['hoteles', 'restaurantes'])->findOrFail($request->package_id);
        $total        = $package->price * $request->persons_quantity;
        $includeHotel = $package->includes_hotel || ($request->include_hotel ?? false);
        $hotelCost    = 0;
        $restaurantCost = 0;

        if ($includeHotel && $package->hoteles->isNotEmpty() && !$request->hotel_id) {
            abort(422, 'Debe seleccionar un hotel para continuar con la reserva.');
        }

        $selectedHotel = null;
        if ($request->hotel_id) {
            $selectedHotel = $package->hoteles->firstWhere('id', $request->hotel_id);
            if (!$selectedHotel) {
                abort(422, 'Hotel no válido para este paquete.');
            }
        }

        if ($request->restaurante_id && !$package->restaurantes->contains('id', $request->restaurante_id)) {
            abort(422, 'Restaurante no válido para este paquete.');
        }

        // Sumar costo de hotel siempre que el usuario haya incluido/seleccionado alojamiento
        if ($includeHotel && $selectedHotel) {
            $hotelCost = $selectedHotel->price_per_person * $request->persons_quantity;
            $total += $hotelCost;
        }

        // Sumar costo de restaurante si fue seleccionado
        if ($request->restaurante_id) {
            $selectedRestaurant = $package->restaurantes->firstWhere('id', $request->restaurante_id);
            if ($selectedRestaurant) {
                $restaurantCost = $selectedRestaurant->price_per_person * $request->persons_quantity;
                $total += $restaurantCost;
            }
        }

        // Crear la reserva
        Booking::create([
            'client_id'        => $client->id,
            'package_id'       => $request->package_id,
            'booking_date'     => $request->booking_date,
            'persons_quantity' => $request->persons_quantity,
            'include_hotel'    => $includeHotel,
            'hotel_id'         => $includeHotel ? $request->hotel_id : null,
            'guide_id'         => $request->guide_id,
            'restaurante_id'   => $request->restaurante_id,
            'total_amount'     => $total,
            'status'           => 'pending',
        ]);

        $booking = Booking::with(['tourPackage.location','client','guide'])
            ->where('client_id', $client->id)
            ->latest()
            ->first();
        // Enviar email de confirmación
        try {
            Mail::to(auth()->user()->email)
            ->send(new BookingConfirmation($booking));
        } catch (\Exception $e) {
            // Log error pero no interrumpir el flujo
            \Log::error('Error al enviar email de confirmación: ' . $e->getMessage());
        }
        return Inertia::render('Bookings/Confirmation', [
            'booking' => $booking
        ]);
    }

    // Lista las reservas del usuario
    public function index()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $bookings = $client
            ? Booking::with(['tourPackage.location', 'guide'])
                ->where('client_id', $client->id)
                ->orderBy('created_at', 'desc')
                ->get()
            : collect();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }

    // Cancela una reserva
    public function destroy($id)
    {
        $client  = Client::where('user_id', auth()->id())->first();
        $booking = Booking::where('id', $id)
            ->where('client_id', $client->id)
            ->firstOrFail();

        $booking->update(['status' => 'cancelled']);

        return redirect()->back()
            ->with('success', 'Reserva cancelada correctamente');
    }
}