<?php

namespace App\Http\Controllers;

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
        $package = TourPackage::with(['category', 'location'])
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
        $package      = TourPackage::findOrFail($request->package_id);
        $total        = $package->price * $request->persons_quantity;
        $includeHotel = $request->include_hotel ?? false;

        if ($includeHotel) {
            $total += 80 * $request->persons_quantity;
        }

        // Crear la reserva
        Booking::create([
            'client_id'        => $client->id,
            'package_id'       => $request->package_id,
            'booking_date'     => $request->booking_date,
            'persons_quantity' => $request->persons_quantity,
            'include_hotel'    => $includeHotel,
            'total_amount'     => $total,
            'status'           => 'pending',
        ]);

        return redirect()->route('bookings.index')
            ->with('success', '¡Reserva realizada con éxito!');
    }

    // Lista las reservas del usuario
    public function index()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $bookings = $client
            ? Booking::with(['tourPackage.location'])
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