<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'location_id', 'title',
        'description', 'price', 'duration_days',
        'includes_guide', 'includes_food',
        'includes_hotel', 'image_url',
        'available_slots', 'status'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'includes_guide' => 'boolean',
        'includes_food' => 'boolean',
        'includes_hotel' => 'boolean',
        'status' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'package_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'package_id');
    }

    public function hoteles()
    {
        return $this->belongsToMany(Hotel::class, 'package_hoteles', 'package_id', 'hotel_id');
    }

    public function guias()
    {
        return $this->belongsToMany(GuiaTuristico::class, 'package_guias', 'package_id', 'guia_id');
    }

    public function restaurantes()
    {
        return $this->belongsToMany(Restaurante::class, 'package_restaurantes', 'package_id', 'restaurante_id');
    }

    public function Transportes()
    {
        return $this->belongsToMany(EmpresaTransporte::class, 'package_transportes', 'package_id', 'empresa_transporte_id');
    }

    public function packageInteractions()
    {
        return $this->hasMany(PackageInteraction::class, 'package_id');
    }

    public function getBookingCountAttribute()
    {
        return $this->bookings()->where('status', '!=', 'cancelled')->count();
    }

    public function getAvgRatingAttribute()
    {
        return $this->reviews()->avg('rating') ?? 0;
    }

    public function getReviewCountAttribute()
    {
        return $this->reviews()->count();
    }

    public function getDaysSinceCreationAttribute()
    {
        return $this->created_at->diffInDays(now());
    }

    public function getNoveltyBoostAttribute()
    {
        $daysSinceCreation = $this->days_since_creation;
        $bookingCount = $this->booking_count;

        if ($daysSinceCreation <= 7) {
            return 1.3;
        }
        if ($daysSinceCreation <= 30) {
            return 1.25;
        }
        if ($daysSinceCreation <= 90) {
            return 1.15;
        }
        if ($bookingCount < 3) {
            return 1.2;
        }
        if ($bookingCount < 10) {
            return 1.1;
        }
        if ($bookingCount > 50) {
            return 0.7;
        }
        if ($bookingCount > 20) {
            return 0.85;
        }
        return 1.0;
    }

    public function getPopularityScoreAttribute()
    {
        $destPopularity = DestinationPopularity::where('location_id', $this->location_id)->first();
        return $destPopularity ? $destPopularity->normalized_score / 100 : 0.5;
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1)
            ->where('available_slots', '>', 0);
    }

    public function scopeMatchingCategory($query, $categoryName)
    {
        if (!$categoryName) {
            return $query;
        }

        return $query->whereHas('category', function ($q) use ($categoryName) {
            $q->where('name', 'LIKE', '%' . $categoryName . '%');
        });
    }

    public function scopeMatchingBudget($query, $budget)
    {
        if (!$budget) {
            return $query;
        }

        return $query->where('price', '<=', $budget * 1.3);
    }

    public function scopeMatchingDuration($query, $duration)
    {
        if (!$duration) {
            return $query;
        }

        return $query->whereBetween('duration_days', [$duration - 2, $duration + 2]);
    }

    public function scopeMatchingActivity($query, $activity)
    {
        if (!$activity) {
            return $query;
        }

        $keywords = array_filter(array_map('trim', explode(' ', strtolower($activity))));

        return $query->where(function ($q) use ($keywords) {
            foreach ($keywords as $keyword) {
                if (strlen($keyword) > 2) {
                    $q->orWhere(function ($qq) use ($keyword) {
                        $qq->where('title', 'LIKE', '%' . $keyword . '%')
                          ->orWhere('description', 'LIKE', '%' . $keyword . '%');
                    });
                }
            }
        });
    }

    public function scopeExcludeBooked($query, array $bookedIds)
    {
        if (empty($bookedIds)) {
            return $query;
        }

        return $query->whereNotIn('id', $bookedIds);
    }

    public function scopeOrderByMatchScore($query, $preferences)
    {
        return $query->orderByRaw("
            CASE
                WHEN price <= ? THEN 30
                WHEN price <= ? * 1.1 THEN 25
                WHEN price <= ? * 1.2 THEN 18
                WHEN price <= ? * 1.3 THEN 10
                ELSE 0
            END +
            CASE
                WHEN ABS(duration_days - ?) <= 1 THEN 20
                WHEN ABS(duration_days - ?) <= 2 THEN 15
                WHEN ABS(duration_days - ?) <= 3 THEN 10
                ELSE 0
            END DESC
        ", [
            $preferences['preferred_budget'] ?? 0,
            $preferences['preferred_budget'] ?? 0,
            $preferences['preferred_budget'] ?? 0,
            $preferences['preferred_budget'] ?? 0,
            $preferences['preferred_duration'] ?? 0,
            $preferences['preferred_duration'] ?? 0,
            $preferences['preferred_duration'] ?? 0,
        ]);
    }

    public function getSimilarPackages($limit = 6)
    {
        return self::active()
            ->where('id', '!=', $this->id)
            ->where(function ($query) {
                $query->where('category_id', $this->category_id)
                    ->orWhere('location_id', $this->location_id);
            })
            ->with(['category', 'location', 'reviews'])
            ->limit($limit)
            ->get();
    }

    public function getSimilarityScore(TourPackage $other)
    {
        $score = 0;

        if ($this->category_id === $other->category_id) {
            $score += 40;
        }

        if ($this->location_id === $other->location_id) {
            $score += 30;
        }

        $priceDiff = abs($this->price - $other->price);
        if ($priceDiff <= 50) {
            $score += 15;
        } elseif ($priceDiff <= 200) {
            $score += 10;
        } elseif ($priceDiff <= 500) {
            $score += 5;
        }

        $durationDiff = abs($this->duration_days - $other->duration_days);
        if ($durationDiff == 0) {
            $score += 15;
        } elseif ($durationDiff == 1) {
            $score += 10;
        } elseif ($durationDiff == 2) {
            $score += 5;
        }

        return $score;
    }

    public static function getHiddenGems($limit = 10)
    {
        return self::active()
            ->with(['category', 'location', 'reviews'])
            ->withCount('bookings')
            ->having('bookings_count', '<', 5)
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }

    public static function getNewArrivals($limit = 10)
    {
        return self::active()
            ->with(['category', 'location', 'reviews'])
            ->where('created_at', '>=', now()->subDays(30))
            ->orderBy('created_at', 'desc')
            ->limit($limit)
            ->get();
    }
}
