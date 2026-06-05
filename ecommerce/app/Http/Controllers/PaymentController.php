<?php

namespace App\Http\Controllers;

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

        // Ver si ya tiene pago pendiente
        $payment = Payment::where('booking_id', $bookingId)->first();

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

        $payment = Payment::findOrFail($id);
        $payment->update(['status' => $request->status]);

        // Si se verifica el pago, confirmar la reserva
        if ($request->status === 'verified') {
            $payment->booking->update(['status' => 'confirmed']);
        }

        return redirect()->back()
            ->with('success', $request->status === 'verified'
                ? 'Pago verificado y reserva confirmada'
                : 'Pago rechazado');
    }
}