<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Preference;
use App\Models\Booking;
use App\Models\TourPackage;
use App\Models\Recommendation;
use Inertia\Inertia;

class RecommendationController extends Controller
{
    public function index()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $preference = $client
            ? Preference::where('client_id', $client->id)->first()
            : null;

        // Si no tiene preferencias configuradas, lo mandamos a configurarlas
        if (!$preference) {
            return redirect()->route('preferences.edit')
                ->with('info', 'Configura tus preferencias para recibir recomendaciones personalizadas 🎯');
        }

        // Ubicaciones que ya visitó (historial de reservas)
        $visitedLocationIds = $client
            ? Booking::where('client_id', $client->id)
                ->with('tourPackage')
                ->get()
                ->pluck('tourPackage.location_id')
                ->filter()
                ->unique()
                ->values()
            : collect();

        // Paquetes ya reservados (para no recomendarlos de nuevo)
        $bookedPackageIds = $client
            ? Booking::where('client_id', $client->id)->pluck('package_id')->toArray()
            : [];

        $packages = TourPackage::with(['category', 'location'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('status', true)
            ->get();

        $scored = $packages->map(function ($pkg) use ($preference, $visitedLocationIds, $bookedPackageIds) {

            $score  = 10; // puntaje base
            $reasons = [];

            // Coincide categoría preferida
            if ($preference->preferred_category && $pkg->category && $pkg->category->name === $preference->preferred_category) {
                $score += 30;
                $reasons[] = 'Coincide con tu categoría favorita';
            }

            // Coincide presupuesto
            if ($preference->preferred_budget) {
                if ($pkg->price <= $preference->preferred_budget) {
                    $score += 25;
                    $reasons[] = 'Dentro de tu presupuesto';
                } elseif ($pkg->price <= $preference->preferred_budget * 1.2) {
                    $score += 10;
                    $reasons[] = 'Cerca de tu presupuesto';
                }
            }

            // Coincide duración
            if ($preference->preferred_duration) {
                $diff = abs($pkg->duration_days - $preference->preferred_duration);
                if ($diff == 0) {
                    $score += 20;
                    $reasons[] = 'Duración ideal para ti';
                } elseif ($diff == 1) {
                    $score += 10;
                }
            }

            // Coincide tipo de actividad (busca en título/descripción)
            if ($preference->preferred_activity) {
                $haystack = strtolower($pkg->title . ' ' . $pkg->description);
                if (str_contains($haystack, strtolower($preference->preferred_activity))) {
                    $score += 15;
                    $reasons[] = 'Incluye lo que te interesa';
                }
            }

            // Ya visitó esa zona antes
            if ($visitedLocationIds->contains($pkg->location_id)) {
                $score += 15;
                $reasons[] = 'Cerca de destinos que ya visitaste';
            }

            // Penaliza si ya lo reservó
            if (in_array($pkg->id, $bookedPackageIds)) {
                $score -= 60;
            }

            $pkg->match_score   = max(0, min(100, $score));
            $pkg->match_reasons = $reasons;

            return $pkg;
        })
        ->filter(fn ($pkg) => !in_array($pkg->id, $bookedPackageIds))
        ->sortByDesc('match_score')
        ->values()
        ->take(6);

        // Guardar recomendaciones en BD
        if ($client) {
            foreach ($scored as $pkg) {
                Recommendation::updateOrCreate(
                    ['client_id' => $client->id, 'package_id' => $pkg->id],
                    ['score' => $pkg->match_score]
                );
            }
        }

        return Inertia::render('TravelMatch/Index', [
            'recommendations' => $scored,
            'preference'      => $preference,
        ]);
    }
}