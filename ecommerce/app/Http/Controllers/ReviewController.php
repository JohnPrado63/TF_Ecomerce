<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Client;
use App\Models\Booking;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:tour_packages,id',
            'rating'     => 'required|integer|min:1|max:5',
            'comment'    => 'nullable|string|max:500',
        ]);

        // Buscar el cliente
        $client = Client::where('user_id', auth()->id())->first();

        if (!$client) {
            return redirect()->back()->with('error', 'No se encontró tu perfil de cliente.');
        }

        // Verificar que el cliente haya reservado este paquete
        $booking = Booking::where('client_id', $client->id)
            ->where('package_id', $request->package_id)
            ->where('status', 'confirmed')
            ->first();

        if (!$booking) {
            return redirect()->back()->with('error', 'Solo puedes reseñar paquetes que hayas reservado y confirmado.');
        }

        // Verificar que no haya reseñado antes
        $existing = Review::where('client_id', $client->id)
            ->where('package_id', $request->package_id)
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'Ya dejaste una reseña para este paquete.');
        }

        Review::create([
            'client_id'  => $client->id,
            'package_id' => $request->package_id,
            'rating'     => $request->rating,
            'comment'    => $request->comment,
        ]);

        return redirect()->back()->with('success', '¡Gracias por tu reseña!');
    }

    public function destroy($id)
    {
        $client = Client::where('user_id', auth()->id())->first();
        $review = Review::where('id', $id)
            ->where('client_id', $client->id)
            ->firstOrFail();

        $review->delete();

        return redirect()->back()->with('success', 'Reseña eliminada correctamente.');
    }
}