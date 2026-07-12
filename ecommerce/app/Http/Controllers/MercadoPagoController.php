<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Client;
use App\Models\Payment;
use App\Models\TourPackage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Exceptions\MPApiException;

class MercadoPagoController extends Controller
{
    public function __construct()
    {
        MercadoPagoConfig::setAccessToken(config('services.mercadopago.access_token'));
    }

    // Crear preferencia de pago
    public function createPreference(Request $request)
    {
        $request->validate([
            'booking_id' => 'required|exists:bookings,id',
        ]);

        $client = Client::where('user_id', auth()->id())->first();
        if (!$client) {
            return response()->json(['error' => 'Cliente no encontrado'], 404);
        }

        $booking = Booking::with(['tourPackage', 'client'])
            ->where('id', $request->booking_id)
            ->where('client_id', $client->id)
            ->first();
        if (!$booking) {
            return response()->json(['error' => 'Reserva no encontrada'], 404);
        }

        try {
            $payerName = trim($booking->client->first_name . ' ' . ($booking->client->last_name ?? ''));
            $payerEmail = auth()->user()->email;
            $unitPrice = round((float) $booking->total_amount, 2);

            \Log::info('MercadoPago - Creating preference', [
                'booking_id' => $booking->id,
                'amount' => $unitPrice,
                'payer_name' => $payerName,
                'payer_email' => $payerEmail,
            ]);

            $preferenceClient = new PreferenceClient();

            $backUrlsSuccess = url('/payments/mp/success?booking_id=' . $booking->id);
            $backUrlsFailure = url('/payments/mp/failure?booking_id=' . $booking->id);
            $backUrlsPending = url('/payments/mp/pending?booking_id=' . $booking->id);

            $preferenceData = [
                'items' => [
                    [
                        'id'          => (string) $booking->id,
                        'title'       => substr($booking->tourPackage->title, 0, 100),
                        'description' => 'Reserva ESKY TRIPS - Orden: ' . $booking->order_number,
                        'quantity'    => 1,
                        'unit_price'  => $unitPrice,
                        'currency_id' => 'PEN',
                    ],
                ],
                'payer' => [
                    'name'  => $payerName,
                    'email' => $payerEmail,
                ],
                'external_reference'  => $booking->order_number,
                'statement_descriptor'=> 'ESKYTRIPS',
                'back_urls' => [
                    'success' => $backUrlsSuccess,
                    'failure' => $backUrlsFailure,
                    'pending' => $backUrlsPending,
                ],
            ];

            if (app()->environment('production')) {
                $preferenceData['auto_return'] = 'approved';
                $preferenceData['notification_url'] = url('/payments/mp/webhook');
            }

            \Log::info('MercadoPago - Preference data being sent', $preferenceData);

            $preference = $preferenceClient->create($preferenceData);

            return response()->json([
                'preference_id' => $preference->id,
                'init_point'    => $preference->init_point,
                'sandbox_init_point' => $preference->sandbox_init_point,
            ]);

        } catch (MPApiException $e) {
            $apiResponse = $e->getApiResponse();
            $errorDetails = 'Unknown error';

            if ($apiResponse && method_exists($apiResponse, 'getContent')) {
                $content = $apiResponse->getContent();
                $errorDetails = is_array($content) ? json_encode($content) : (string) $content;
            }

            \Log::error('MercadoPago API Error: ' . $e->getMessage() . ' | Response: ' . $errorDetails);

            return response()->json([
                'error' => 'Error al crear preferencia: ' . $e->getMessage(),
                'details' => $errorDetails,
            ], 500);
        } catch (\Exception $e) {
            \Log::error('MercadoPago Unexpected Error: ' . $e->getMessage() . ' | File: ' . $e->getFile() . ' | Line: ' . $e->getLine());

            return response()->json([
                'error' => 'Error inesperado: ' . $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ], 500);
        }
    }

    // Resultado exitoso
    public function success(Request $request)
    {
        $booking = Booking::with(['tourPackage.location', 'client'])
            ->findOrFail($request->booking_id);

        // Verificar si ya existe un pago verificado para esta reserva (idempotencia)
        $existingVerifiedPayment = Payment::where('booking_id', $booking->id)
            ->where('status', 'verified')
            ->exists();

        if ($existingVerifiedPayment) {
            // Ya fue pagado anteriormente, no crear duplicado
            return Inertia::render('Bookings/Confirmation', [
                'booking' => $booking,
            ]);
        }

        // Registrar pago
        Payment::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'amount'       => $booking->total_amount,
                'method'       => 'mercadopago',
                'status'       => 'verified',
                'voucher_path' => null,
                'notes'        => 'Pago procesado por MercadoPago. ID: ' . $request->payment_id,
            ]
        );

        // Confirmar reserva solo si no estaba ya confirmada
        if ($booking->status !== 'confirmed') {
            // Decrementar slots al confirmar por MercadoPago
            TourPackage::where('id', $booking->package_id)
                ->decrement('available_slots', $booking->persons_quantity);
            $booking->update(['status' => 'confirmed']);
        }

        return Inertia::render('Bookings/Confirmation', [
            'booking' => $booking,
        ]);
    }

    // Pago pendiente
    public function pending(Request $request)
    {
        $booking = Booking::findOrFail($request->booking_id);
        $booking->update(['status' => 'pending']);

        // Crear registro Payment para que el admin lo vea
        Payment::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'amount'       => $booking->total_amount,
                'method'       => 'mercadopago',
                'status'       => 'pending',
                'voucher_path' => null,
                'notes'        => 'MercadoPago: pago en proceso de verificación',
            ]
        );

        return redirect()->route('bookings.index')
            ->with('info', 'Tu pago está siendo procesado. Te notificaremos cuando se confirme.');
    }

    // Pago fallido
    public function failure(Request $request)
    {
        $booking = Booking::findOrFail($request->booking_id);

        // Crear registro Payment rechazado para que el admin lo vea
        Payment::updateOrCreate(
            ['booking_id' => $booking->id],
            [
                'amount'       => $booking->total_amount,
                'method'       => 'mercadopago',
                'status'       => 'rejected',
                'voucher_path' => null,
                'notes'        => 'MercadoPago: pago rechazado o fallido',
            ]
        );

        // Reintegrar slots y cancelar reserva
        TourPackage::where('id', $booking->package_id)
            ->increment('available_slots', $booking->persons_quantity);
        $booking->update(['status' => 'cancelled']);

        return redirect()->route('bookings.index')
            ->with('error', 'El pago no pudo procesarse. Tu reserva ha sido cancelada y los cupos fueron reintegrados.');
    }

    // Webhook de MercadoPago
    public function webhook(Request $request)
    {
        $type = $request->input('type');
        $data = $request->input('data');

        if ($type === 'payment' && isset($data['id'])) {
            try {
                MercadoPagoConfig::setAccessToken(config('services.mercadopago.access_token'));

                $paymentClient = new \MercadoPago\Client\Payment\PaymentClient();
                $mpPayment     = $paymentClient->get($data['id']);

                $orderNumber = $mpPayment->external_reference;
                $booking     = Booking::where('order_number', $orderNumber)->first();

                if ($booking) {
                    if ($mpPayment->status === 'approved') {
                        // Verificar si ya existe pago verified (idempotencia)
                        $existingVerifiedPayment = Payment::where('booking_id', $booking->id)
                            ->where('status', 'verified')
                            ->exists();

                        if (!$existingVerifiedPayment) {
                            Payment::updateOrCreate(
                                ['booking_id' => $booking->id],
                                [
                                    'amount'    => $mpPayment->transaction_amount,
                                    'method'    => 'mercadopago',
                                    'status'    => 'verified',
                                    'notes'     => 'Webhook MP - ID: ' . $data['id'],
                                ]
                            );
                        }

                        // Confirmar reserva solo si no estaba ya confirmada
                        if ($booking->status !== 'confirmed') {
                            // Decrementar slots al confirmar por webhook
                            TourPackage::where('id', $booking->package_id)
                                ->decrement('available_slots', $booking->persons_quantity);
                            $booking->update(['status' => 'confirmed']);
                        }

                    } elseif (in_array($mpPayment->status, ['rejected', 'cancelled'])) {
                        $booking->update(['status' => 'cancelled']);
                    }
                }

            } catch (\Exception $e) {
                \Log::error('Webhook MP error: ' . $e->getMessage());
            }
        }

        return response()->json(['status' => 'ok']);
    }
}