<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    use HasFactory;
    protected $table = 'hotels';

    protected $fillable = [
        'location_id', 'name',
        'stars', 'address', 'phone',
        'price_per_person'
    ];

    // A hotel belongs to a location
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // A hotel belongs to many packages
    public function tourPackages()
    {
        return $this->belongsToMany(TourPackage::class, 'package_hotels', 'hotel_id', 'package_id');
    }

    public static function getHotelsNearby($locationId, $limit = 2)
    {
        $location = Location::find($locationId);

        $hotels = Hotel::where('location_id', $locationId)->limit($limit)->get();

        if ($hotels->isEmpty() && $location) {
            $hotels = Hotel::whereHas('location', function ($query) use ($location) {
                $query->where('region', $location->region);
            })->limit($limit)->get();
        }

        if ($hotels->isEmpty()) {
            $hotels = Hotel::limit($limit)->get();
        }

        return $hotels;
    }
}
