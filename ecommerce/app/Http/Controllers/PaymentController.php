<?php

namespace App\Http\Controllers;
use App\Mail\PaymentConfirmation;
use Illuminate\Support\Facades\Mail;
use App\Models\Payment;
use App\Models\Booking;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // Mostrar pantalla de pago
    public function show($bookingId)
    {
        $client  = Client::where('user_id', auth()->id())->first();
        $booking = Booking::with(['tourPackage.location'])
            ->where('id', $bookingId)
            ->where('client_id', $client->id)
            ->firstOrFail();

        // Si no existe registro Payment, lo creamos con estado pending y sin método
        // así el admin puede ver que hay una reserva pendiente de pago
        $payment = Payment::firstOrCreate(
            ['booking_id' => $bookingId],
            [
                'amount'       => $booking->total_amount,
                'method'       => null,
                'status'       => 'pending',
                'voucher_path' => null,
                'notes'        => 'Esperando selección de método de pago',
            ]
        );

        return Inertia::render('Payments/Show', [
            'booking' => $booking,
            'payment' => $payment,
        ]);
    }

    // Subir comprobante
    public function store(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
            'method'     => 'required|in:yape,plin,efectivo',
            'voucher'    => 'required|image|max:5120',
        ]);

        $client  = Client::where('user_id', auth()->id())->first();
        $booking = Booking::where('id', $request->booking_id)
            ->where('client_id', $client->id)
            ->firstOrFail();

        // Guardar imagen del comprobante
        $path = $request->file('voucher')->store('vouchers', 'public');

        // Crear o actualizar pago
        Payment::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'amount'       => $booking->total_amount,
                'method'       => $request->method,
                'status'       => 'pending',
                'voucher_path' => $path,
                'notes'        => $request->order_reference,
            ]
        );

        return redirect()->route('bookings.index')
            ->with('success', '¡Comprobante enviado! El admin verificará tu pago pronto.');
    }

    // Admin verifica el pago
    public function verify(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:verified,rejected',
        ]);

        $payment = Payment::with(['booking.client.user', 'booking.tourPackage'])
            ->findOrFail($id);

        $booking = $payment->booking;

        if ($request->status === 'verified') {
            // Confirmar la reserva SOLO si no estaba ya confirmada
            if ($booking->status !== 'confirmed') {
                // Decrementar slots SOLO la primera vez que se confirma
                \App\Models\TourPackage::where('id', $booking->package_id)
                    ->decrement('available_slots', $booking->persons_quantity);
                $booking->update(['status' => 'confirmed']);
            }
            $payment->update(['status' => 'verified']);

            // Enviar correo de confirmación de pago
            try {
                $userEmail = $payment->booking->client->user->email;
                \Log::info("Intentando enviar correo de confirmación a: $userEmail");
                Mail::to($userEmail)->send(new PaymentConfirmation($payment));
                \Log::info("Correo de confirmación enviado exitosamente a: $userEmail");
            } catch (\Exception $e) {
                \Log::error("Error al enviar correo de confirmación: " . $e->getMessage());
            }

            return redirect()->back()
                ->with('success', 'Pago verificado y reserva confirmada');
        }

        // Rechazo: reintegrar slots y cancelar reserva
        $payment->update(['status' => 'rejected']);

        if (in_array($booking->status, ['pending'])) {
            // Solo reintegramos slots si la reserva aún no ha sido confirmada
            // (si ya estaba confirmada, el pago ya se concretó y no se toca)
            \App\Models\TourPackage::where('id', $booking->package_id)
                ->increment('available_slots', $booking->persons_quantity);
            $booking->update(['status' => 'cancelled']);
        }

return redirect()->back()
                ->with('success', 'Pago rechazado' . ($booking->status === 'confirmed' ? ' (reserva ya estaba confirmada)' : ' y reserva cancelada'));
    }
}