<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Preference;
use App\Models\Booking;
use App\Models\TourPackage;
use App\Models\Recommendation;
use App\Models\PackageInteraction;
use App\Models\DestinationPopularity;
use Inertia\Inertia;

class RecommendationController extends Controller
{
    public function index()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $preference = $client
            ? Preference::where('client_id', $client->id)->first()
            : null;

        if (!$preference) {
            return redirect()->route('preferences.edit')
                ->with('info', 'Configura tus preferencias para recibir recomendaciones personalizadas 🎯');
        }

        $bookedPackageIds = $client
            ? Booking::where('client_id', $client->id)->pluck('package_id')->toArray()
            : [];

        $visitedLocationIds = $client
            ? $client->getVisitedLocationIds()
            : [];

        $behavioralProfile = $client
            ? $client->getBehavioralProfile()
            : ['preferred_categories' => [], 'preferred_locations' => [], 'avg_budget' => null];

        $packages = TourPackage::with(['category', 'location', 'reviews'])
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->where('status', 1)
            ->where('available_slots', '>', 0)
            ->get();

        $scored = $packages->map(function ($pkg) use ($preference, $visitedLocationIds, $bookedPackageIds, $behavioralProfile) {
            $score = $this->calculatePackageScore($pkg, $preference, $visitedLocationIds, $behavioralProfile);
            $reasons = $this->generateMatchReasons($pkg, $preference, $visitedLocationIds, $score);

            $pkg->match_score = max(0, min(100, $score['total']));
            $pkg->match_reasons = $reasons;
            $pkg->score_breakdown = $score['breakdown'];

            return $pkg;
        })
        ->filter(fn ($pkg) => !in_array($pkg->id, $bookedPackageIds))
        ->sortByDesc(function ($pkg) {
            return $pkg->match_score;
        })
        ->values()
        ->take(8);

        if ($client) {
            Recommendation::where('client_id', $client->id)->update(['viewed' => false]);

            foreach ($scored as $pkg) {
                Recommendation::updateOrCreate(
                    ['client_id' => $client->id, 'package_id' => $pkg->id],
                    [
                        'score' => $pkg->match_score,
                        'viewed' => true,
                        'interaction_type' => 'view',
                    ]
                );
            }
        }

        return Inertia::render('TravelMatch/Index', [
            'recommendations' => $scored,
            'preference' => $preference,
            'behavioralProfile' => $behavioralProfile,
        ]);
    }

    protected function calculatePackageScore($pkg, $preference, $visitedLocationIds, $behavioralProfile)
    {
        $breakdown = [];
        $total = 0;

        $categoryScore = $this->calculateCategoryScore($pkg, $preference, $behavioralProfile);
        $breakdown['category'] = $categoryScore;
        $total += $categoryScore;

        $budgetScore = $this->calculateBudgetScore($pkg, $preference);
        $breakdown['budget'] = $budgetScore;
        $total += $budgetScore;

        $durationScore = $this->calculateDurationScore($pkg, $preference);
        $breakdown['duration'] = $durationScore;
        $total += $durationScore;

        $activityScore = $this->calculateActivityScore($pkg, $preference);
        $breakdown['activity'] = $activityScore;
        $total += $activityScore;

        $noveltyBoost = $this->calculateNoveltyBoost($pkg);
        $breakdown['novelty'] = $noveltyBoost;

        $popularityFactor = $this->calculatePopularityFactor($pkg);
        $breakdown['popularity'] = $popularityFactor;

        $total = $total * $noveltyBoost * $popularityFactor;

        $locationBonus = $this->calculateLocationBonus($pkg, $visitedLocationIds, $behavioralProfile);
        $breakdown['location'] = $locationBonus;
        $total += $locationBonus;

        return [
            'total' => $total,
            'breakdown' => $breakdown,
        ];
    }

    protected function calculateCategoryScore($pkg, $preference, $behavioralProfile)
    {
        $score = 0;
        $categoryName = $pkg->category?->name ?? '';
        $categoryLower = strtolower($categoryName);

        if ($preference->preferred_category) {
            $prefCatLower = strtolower($preference->preferred_category);

            if ($categoryLower === $prefCatLower) {
                $score += 35;
            } elseif (str_contains($categoryLower, $prefCatLower) || str_contains($prefCatLower, $categoryLower)) {
                $score += 25;
            } elseif ($this->categoriesMatch($categoryLower, $prefCatLower)) {
                $score += 20;
            }
        }

        if (!empty($behavioralProfile['preferred_categories']) && in_array($categoryName, $behavioralProfile['preferred_categories'])) {
            $score += 10;
        }

        if ($preference->traveler_type) {
            if ($this->travelerTypeMatchesCategory($preference->traveler_type, $categoryLower)) {
                $score += 5;
            }
        }

        return min(40, $score);
    }

    protected function categoriesMatch($category, $prefCategory)
    {
        $mapping = [
            'cultural' => ['cultural', 'histórico', 'historia', 'arqueología', 'museo'],
            'aventura' => ['aventura', 'extremo', 'deporte', 'río', 'selva'],
            'gastronomia' => ['gastronomía', 'comida', 'culinario', 'restaurante', 'chef'],
            'religioso' => ['religioso', 'templo', 'iglesia', 'peregrinación', 'espiritual'],
            'ecoturismo' => ['ecoturismo', 'naturaleza', 'reserva', 'parque', 'vida salvaje'],
        ];

        foreach ($mapping as $type => $keywords) {
            if (in_array($prefCategory, $keywords)) {
                foreach ($keywords as $keyword) {
                    if (str_contains($category, $keyword)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    protected function travelerTypeMatchesCategory($travelerType, $categoryLower)
    {
        $typeCategoryMap = [
            'adventurer' => ['aventura', 'extremo', 'deporte', 'río', 'selva', 'montaña'],
            'cultural' => ['cultural', 'histórico', 'historia', 'arqueología', 'museo'],
            'relaxed' => ['spa', 'playa', 'relax', 'descanso', 'bienestar'],
            'gastronomic' => ['gastronomía', 'comida', 'culinario', 'restaurante'],
            'spiritual' => ['religioso', 'templo', 'iglesia', 'peregrinación'],
            'ecotourist' => ['ecoturismo', 'naturaleza', 'reserva', 'parque', 'vida salvaje'],
        ];

        $keywords = $typeCategoryMap[$travelerType] ?? [];
        foreach ($keywords as $keyword) {
            if (str_contains($categoryLower, $keyword)) {
                return true;
            }
        }

        return false;
    }

    protected function calculateBudgetScore($pkg, $preference)
    {
        if (!$preference->preferred_budget) {
            return 15;
        }

        $budget = floatval($preference->preferred_budget);
        $price = floatval($pkg->price);

        if ($price <= $budget) {
            return 30;
        }
        if ($price <= $budget * 1.1) {
            return 25;
        }
        if ($price <= $budget * 1.15) {
            return 20;
        }
        if ($price <= $budget * 1.2) {
            return 15;
        }
        if ($price <= $budget * 1.3) {
            return 8;
        }

        return 0;
    }

    protected function calculateDurationScore($pkg, $preference)
    {
        if (!$preference->preferred_duration) {
            return 10;
        }

        $prefDuration = intval($preference->preferred_duration);
        $pkgDuration = intval($pkg->duration_days);
        $diff = abs($pkgDuration - $prefDuration);

        if ($diff == 0) {
            return 20;
        }
        if ($diff == 1) {
            return 15;
        }
        if ($diff == 2) {
            return 10;
        }
        if ($diff == 3) {
            return 5;
        }

        return 0;
    }

    protected function calculateActivityScore($pkg, $preference)
    {
        if (!$preference->preferred_activity) {
            return 5;
        }

        $keywords = array_filter(
            array_map('trim', explode(' ', strtolower($preference->preferred_activity)))
        );

        $haystack = strtolower($pkg->title . ' ' . $pkg->description);
        $matches = 0;

        foreach ($keywords as $keyword) {
            if (strlen($keyword) > 2 && str_contains($haystack, $keyword)) {
                $matches++;
            }
        }

        return min(15, $matches * 5);
    }

    protected function calculateNoveltyBoost($pkg)
    {
        $daysSinceCreation = $pkg->created_at->diffInDays(now());
        $bookingCount = $pkg->bookings()->where('status', '!=', 'cancelled')->count();

        if ($daysSinceCreation <= 7) {
            return 1.3;
        }
        if ($daysSinceCreation <= 14) {
            return 1.25;
        }
        if ($daysSinceCreation <= 30) {
            return 1.2;
        }
        if ($daysSinceCreation <= 60) {
            return 1.1;
        }

        if ($bookingCount == 0) {
            return 1.25;
        }
        if ($bookingCount < 3) {
            return 1.15;
        }
        if ($bookingCount < 5) {
            return 1.05;
        }
        if ($bookingCount > 50) {
            return 0.7;
        }
        if ($bookingCount > 30) {
            return 0.85;
        }
        if ($bookingCount > 15) {
            return 0.95;
        }

        return 1.0;
    }

    protected function calculatePopularityFactor($pkg)
    {
        $destPopularity = DestinationPopularity::where('location_id', $pkg->location_id)->first();

        if (!$destPopularity) {
            return 1.0;
        }

        $normalizedScore = $destPopularity->normalized_score / 100;

        if ($normalizedScore < 0.2) {
            return 1.1;
        }
        if ($normalizedScore > 0.8) {
            return 0.95;
        }

        return 1.0;
    }

    protected function calculateLocationBonus($pkg, $visitedLocationIds, $behavioralProfile)
    {
        $bonus = 0;

        $isNewDestination = !in_array($pkg->location_id, $visitedLocationIds);
        if ($isNewDestination && !empty($visitedLocationIds)) {
            $bonus += 8;
        }

        if (!empty($behavioralProfile['preferred_locations'])) {
            if (in_array($pkg->location_id, $behavioralProfile['preferred_locations'])) {
                $bonus += 7;
            }
        }

        if ($pkg->includes_guide) {
            $bonus += 2;
        }
        if ($pkg->includes_food) {
            $bonus += 2;
        }
        if ($pkg->includes_hotel) {
            $bonus += 2;
        }

        $avgRating = $pkg->reviews_avg_rating ?? 0;
        if ($avgRating >= 4.5) {
            $bonus += 4;
        } elseif ($avgRating >= 4.0) {
            $bonus += 2;
        } elseif ($avgRating >= 3.0) {
            $bonus += 1;
        }

        return $bonus;
    }

    protected function generateMatchReasons($pkg, $preference, $visitedLocationIds, $score)
    {
        $reasons = [];

        if ($score['breakdown']['category'] >= 30) {
            $reasons[] = 'Coincide perfectamente con tu categoría favorita';
        } elseif ($score['breakdown']['category'] >= 20) {
            $reasons[] = 'Categoría que te interesa';
        }

        if ($score['breakdown']['budget'] >= 25) {
            $reasons[] = 'Dentro de tu presupuesto';
        } elseif ($score['breakdown']['budget'] >= 15) {
            $reasons[] = 'Muy cerca de tu presupuesto';
        } elseif ($score['breakdown']['budget'] >= 8) {
            $reasons[] = 'Un poco acima del presupuesto';
        }

        if ($score['breakdown']['duration'] >= 15) {
            $reasons[] = 'Duración perfecta para ti';
        } elseif ($score['breakdown']['duration'] >= 10) {
            $reasons[] = 'Casi la duración que buscabas';
        }

        if ($score['breakdown']['activity'] >= 10) {
            $reasons[] = 'Incluye lo que te interesa';
        } elseif ($score['breakdown']['activity'] >= 5) {
            $reasons[] = 'Relacionado con tus intereses';
        }

        if ($score['breakdown']['novelty'] > 1.1) {
            $reasons[] = 'Paquete nuevo o poco conocido';
        } elseif ($score['breakdown']['novelty'] < 0.9) {
            $reasons[] = 'Muy popular entre viajeros';
        }

        if ($pkg->reviews_avg_rating >= 4.5) {
            $reasons[] = 'Excelentes reseñas';
        } elseif ($pkg->reviews_avg_rating >= 4.0) {
            $reasons[] = 'Buenas reseñas';
        }

        if ($pkg->includes_guide && $pkg->includes_food && $pkg->includes_hotel) {
            $reasons[] = 'Todo incluido';
        } elseif ($pkg->includes_guide) {
            $reasons[] = 'Guía turístico incluido';
        }

        return array_slice($reasons, 0, 4);
    }

    public function track()
    {
        $data = request()->validate([
            'package_id' => 'required|exists:tour_packages,id',
            'type' => 'required|in:view,click,hover,save,compare',
            'session_id' => 'nullable|string|max:100',
            'duration' => 'nullable|integer',
            'search_query' => 'nullable|string',
        ]);

        $client = Client::where('user_id', auth()->id())->first();

        PackageInteraction::create([
            'package_id' => $data['package_id'],
            'client_id' => $client?->id,
            'session_id' => $data['session_id'] ?? session()->getId(),
            'type' => $data['type'],
            'duration_seconds' => $data['duration'],
            'search_query' => $data['search_query'],
        ]);

        if ($client && $data['type'] === 'view') {
            Recommendation::where('client_id', $client->id)
                ->where('package_id', $data['package_id'])
                ->update([
                    'interaction_type' => 'view',
                    'view_duration' => $data['duration'],
                    'viewed' => true,
                ]);
        }

        return response()->json(['success' => true]);
    }

    public function similar($packageId)
    {
        $package = TourPackage::with(['category', 'location'])->findOrFail($packageId);

        $similar = $package->getSimilarPackages(6);

        $similar = $similar->map(function ($pkg) use ($package) {
            $pkg->similarity_score = $package->getSimilarityScore($pkg);
            return $pkg;
        })->sortByDesc('similarity_score');

        return response()->json($similar->values());
    }
}
