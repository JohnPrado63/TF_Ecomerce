<?php

namespace App\Http\Controllers;

use App\Mail\BookingConfirmation;
use Illuminate\Support\Facades\Mail;
use App\Models\Booking;
use App\Models\Client;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    // Muestra el formulario de reserva
    public function create(Request $request)
    {
        if(!auth()->check()) {
            session(['url.intended' => url()->full()]);
            return redirect()->route('login')
                ->with('info', 'Por favor, Inicia sesión para continuar con tu reserva');
        }

        $package = TourPackage::with(['category', 'location', 'hoteles', 'restaurantes', 'guias'])
            ->findOrFail($request->package_id);

        $offer = null;
        if ($request->offer){
            $offer = \App\Models\Offer::where('slug', $request->offer)
                ->where('active', true)
                ->whereDate('start_date', '<=', now())
                ->whereDate('end_date', '>=', now())
                ->first();
        }    

        return Inertia::render('Bookings/Create', [
            'package' => $package,
            'offer'   => $offer,
        ]);
    }

    // Guarda la reserva
    public function store(Request $request)
    {
        // 1. Validación inicial de tipos de datos
        $request->validate([
            'package_id'       => 'required|exists:tour_packages,id',
            'booking_date'     => 'required|date|after:today',
            'persons_quantity' => 'required|integer|min:1|max:20',
            'include_hotel'    => 'boolean',
            'hotel_id'         => 'nullable|exists:hoteles,id',
            'restaurante_id'   => 'nullable|exists:restaurantes,id',
            'guide_id'         => 'nullable|exists:guias_turisticos,id',
        ]);

        // Usar transacción para evitar race conditions en la gestión de slots
        return DB::transaction(function () use ($request) {
            // 2. Bloquear el paquete para evitar race conditions
            $package = TourPackage::where('id', $request->package_id)
                ->lockForUpdate()
                ->firstOrFail();

            // Cargar relaciones después del lock
            $package->load(['hoteles', 'restaurantes']);

            // 3. Validación de disponibilidad de cupos
            if ($package->available_slots <= 0){
                return redirect()->back()->with('error', 'Lo sentimos, este paquete ya no tiene lugares disponibles.');
            }
            if ($request->persons_quantity > $package->available_slots){
                return redirect()->back()->with('error', "Solo quedan {$package->available_slots} lugar(es) disponible(s) para este paquete.");
            }

            // 4. Validaciones de coherencia comercial (Hotel y Restaurante)
            $includeHotel = $request->include_hotel ?? false;
            $selectedHotel = null;

            if ($includeHotel) {
                if ($package->hoteles->isNotEmpty() && !$request->hotel_id) {
                    return redirect()->back()->with('error', 'Debe seleccionar un hotel para continuar con la reserva.');
                }
                if ($request->hotel_id) {
                    $selectedHotel = $package->hoteles->firstWhere('id', $request->hotel_id);
                    if (!$selectedHotel) {
                        return redirect()->back()->with('error', 'Hotel no válido para este paquete.');
                    }
                }
            }

            if ($request->restaurante_id && !$package->restaurantes->contains('id', $request->restaurante_id)) {
                return redirect()->back()->with('error', 'Restaurante no válido para este paquete.');
            }

            // 5. Buscar o crear el cliente vinculado al usuario
            $client = Client::firstOrCreate(
                ['user_id' => auth()->id()],
                [
                    'first_name'      => auth()->user()->name,
                    'last_name'       => '',
                    'document_type'   => 'DNI',
                    'document_number' => '00000000',
                ]
            );

            // 6. Cálculo del precio total base
            $total = $package->price * $request->persons_quantity;

            // Sumar costo real de hotel si aplica
            if ($includeHotel && $selectedHotel) {
                $total += $selectedHotel->price_per_person * $request->persons_quantity;
            }

            // Sumar costo de restaurante si aplica
            if ($request->restaurante_id) {
                $selectedRestaurant = $package->restaurantes->firstWhere('id', $request->restaurante_id);
                if ($selectedRestaurant) {
                    $total += ($selectedRestaurant->price_per_person??0) * $request->persons_quantity;
                }
            }
            $offer=null;
            $discountAmount=0;
            // 7. Aplicar descuento sobre el subtotal totalizado
            if ($request->offer_id) {
                $offer = \App\Models\Offer::find($request->offer_id);
                if ($offer && $offer->isValid()) {
                    $discountAmount = round($total * ($offer->discount_percentage / 100), 2);
                    $total -= $discountAmount;
                }
            }

            // 8. Crear la reserva
            $booking = Booking::create([
                'client_id'        => $client->id,
                'package_id'       => $request->package_id,
                'booking_date'     => $request->booking_date,
                'persons_quantity' => $request->persons_quantity,
                'include_hotel'    => $includeHotel,
                'hotel_id'         => $includeHotel ? $request->hotel_id : null,
                'guide_id'         => $request->guide_id,
                'offer_id'         =>$offer?->id,
                'discount_amount'  =>$discountAmount,
                'restaurante_id'   => $request->restaurante_id,
                'total_amount'     => $total,
                'status'           => 'pending',
            ]);

            // NOTA: Los slots se decrementan SOLO cuando el pago es verificado
            // (ver PaymentController::verify y MercadoPagoController::success)
            // Esto evita desincronización entre booking y slots

            // Cargar relaciones directo de la instancia creada
            $booking->load(['tourPackage.location', 'client', 'guide']);

            // Enviar email de confirmación
            try {
                Mail::to(auth()->user()->email)->send(new BookingConfirmation($booking));
            } catch (\Exception $e) {
                Log::error('Error al enviar email de confirmación: ' . $e->getMessage());
            }

            return Inertia::render('Bookings/Confirmation', [
                'booking' => $booking
            ]);
        });
    }

    // Lista las reservas del usuario
    public function index()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $bookings = $client
            ? Booking::with(['tourPackage.location', 'guide', 'payments'])
                ->where('client_id', $client->id)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($booking) {
                    $payment = $booking->payments->first();
                    $booking->payment_status = $payment ? $payment->status : null;
                    return $booking;
                })
            : collect();

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }

    // Cancela una reserva
    public function destroy($id)
    {
        $client  = Client::where('user_id', auth()->id())->first();
        $booking = Booking::with('payments')
            ->where('id', $id)
            ->where('client_id', $client->id)
            ->firstOrFail();

        // Verificar si existe un pago ya verificado (confirmado)
        $verifiedPayment = $booking->payments->firstWhere('status', 'verified');

        if ($verifiedPayment) {
            return redirect()->back()->with('error', 'No puedes cancelar una reserva cuyo pago ya fue confirmado. Contacta a soporte.');
        }

        // Reintegrar slots solo si la reserva estaba activa (pending o confirmed)
        if (in_array($booking->status, ['pending', 'confirmed'])){
            TourPackage::where('id', $booking->package_id)
                ->increment('available_slots', $booking->persons_quantity);
        }

        $booking->update(['status' => 'cancelled']);

        return redirect()->back()->with('success', 'Reserva cancelada correctamente');
    }
}
