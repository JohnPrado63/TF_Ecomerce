<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DestinationPopularity extends Model
{
    use HasFactory;

    protected $table = 'destination_popularity';

    protected $fillable = [
        'location_id', 'total_views', 'total_bookings',
        'avg_rating', 'review_count', 'popularity_score'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public static function calculateScore($locationId)
    {
        $dest = self::where('location_id', $locationId)->first();

        if (!$dest) {
            return 0;
        }

        $viewScore = min($dest->total_views / 100, 30);
        $bookingScore = min($dest->total_bookings * 3, 30);
        $ratingScore = ($dest->avg_rating / 5) * 25;
        $reviewScore = min(log($dest->review_count + 1) * 5, 15);

        return round($viewScore + $bookingScore + $ratingScore + $reviewScore, 2);
    }

    public static function updatePopularity($locationId)
    {
        $location = Location::find($locationId);
        if (!$location) {
            return null;
        }

        $totalViews = PackageInteraction::whereHas('package', function ($q) use ($locationId) {
            $q->where('location_id', $locationId);
        })->where('type', 'view')->count();

        $totalBookings = Booking::whereHas('tourPackage', function ($q) use ($locationId) {
            $q->where('location_id', $locationId);
        })->count();

        $reviews = Review::whereHas('tourPackage', function ($q) use ($locationId) {
            $q->where('location_id', $locationId);
        })->selectRaw('AVG(rating) as avg_rating, COUNT(*) as count')->first();

        $dest = self::updateOrCreate(
            ['location_id' => $locationId],
            [
                'total_views' => $totalViews,
                'total_bookings' => $totalBookings,
                'avg_rating' => $reviews->avg_rating ?? 0,
                'review_count' => $reviews->count ?? 0,
                'popularity_score' => 0,
                'last_calculated_at' => now(),
            ]
        );

        $dest->popularity_score = self::calculateScore($locationId);
        $dest->save();

        return $dest;
    }

    public static function refreshAll()
    {
        $locations = Location::has('tourPackages')->get();
        foreach ($locations as $location) {
            self::updatePopularity($location->id);
        }
    }

    public function getNormalizedScoreAttribute()
    {
        $maxScore = self::max('popularity_score');
        if ($maxScore == 0) {
            return 0;
        }
        return round(($this->popularity_score / $maxScore) * 100, 2);
    }
}
