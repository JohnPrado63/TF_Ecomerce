<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'first_name', 'last_name',
        'document_type', 'document_number',
        'phone', 'address', 'birth_date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function preferences()
    {
        return $this->hasMany(Preference::class);
    }

    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }

    public function packageInteractions()
    {
        return $this->hasMany(PackageInteraction::class);
    }

    public function latestPreference()
    {
        return $this->hasOne(Preference::class)->latestOfMany();
    }

    public function trackInteraction($packageId, $type, $sessionId = null, $duration = null, $searchQuery = null)
    {
        return PackageInteraction::create([
            'package_id' => $packageId,
            'client_id' => $this->id,
            'session_id' => $sessionId,
            'type' => $type,
            'duration_seconds' => $duration,
            'search_query' => $searchQuery,
        ]);
    }

    public function getBehavioralProfile()
    {
        $interactions = $this->packageInteractions()->with('package.category')->get();

        if ($interactions->isEmpty()) {
            return [
                'preferred_categories' => [],
                'preferred_locations' => [],
                'avg_budget' => null,
                'viewed_count' => 0,
                'clicked_count' => 0,
                'saved_count' => 0,
                'traveler_type_hints' => [],
            ];
        }

        $categoryViews = $interactions->where('type', 'view')
            ->groupBy(fn($i) => $i->package?->category?->name)
            ->map->count()
            ->sortDesc();

        $locationViews = $interactions->where('type', 'view')
            ->groupBy(fn($i) => $i->package?->location_id)
            ->map->count()
            ->sortDesc();

        $bookedPackages = $this->bookings()->with('tourPackage')->get();
        $avgBudget = $bookedPackages->avg('tourPackage.price');

        return [
            'preferred_categories' => $categoryViews->keys()->take(3)->toArray(),
            'preferred_locations' => $locationViews->keys()->take(3)->toArray(),
            'avg_budget' => $avgBudget,
            'viewed_count' => $interactions->where('type', 'view')->count(),
            'clicked_count' => $interactions->where('type', 'click')->count(),
            'saved_count' => $interactions->where('type', 'save')->count(),
            'traveler_type_hints' => $this->inferTravelerType($categoryViews),
        ];
    }

    protected function inferTravelerType($categoryViews)
    {
        $hints = [];
        $topCategory = $categoryViews->keys()->first();

        if ($topCategory) {
            $categoryLower = strtolower($topCategory);
            if (str_contains($categoryLower, 'aventura')) {
                $hints[] = 'adventurer';
            }
            if (str_contains($categoryLower, 'cultural') || str_contains($categoryLower, 'histórico')) {
                $hints[] = 'cultural';
            }
            if (str_contains($categoryLower, 'gastronomía')) {
                $hints[] = 'gastronomic';
            }
            if (str_contains($categoryLower, 'religioso')) {
                $hints[] = 'spiritual';
            }
            if (str_contains($categoryLower, 'ecoturismo')) {
                $hints[] = 'ecotourist';
            }
        }

        return $hints;
    }

    public function getVisitedLocationIds()
    {
        return $this->bookings()
            ->where('status', '!=', 'cancelled')
            ->with('tourPackage')
            ->get()
            ->pluck('tourPackage.location_id')
            ->filter()
            ->unique()
            ->toArray();
    }

    public function getSavedPackageIds()
    {
        return PackageInteraction::where('client_id', $this->id)
            ->where('type', 'save')
            ->pluck('package_id')
            ->toArray();
    }

    public function getRecentlyViewedPackageIds($limit = 10)
    {
        return PackageInteraction::where('client_id', $this->id)
            ->whereIn('type', ['view', 'click'])
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->pluck('package_id')
            ->unique()
            ->toArray();
    }
}
