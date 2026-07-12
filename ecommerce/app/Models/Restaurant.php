<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;
    protected $table = 'restaurants';

    protected $fillable = [
        'location_id', 'name',
        'cuisine_type', 'address',
        'price_per_person'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function tourPackages()
    {
        return $this->belongsToMany(TourPackage::class, 'package_restaurants', 'restaurant_id', 'package_id');
    }

    public static function getRestaurantsNearby($locationId, $limit = 2)
    {
        $location = Location::find($locationId);

        $restaurants = Restaurant::where('location_id', $locationId)->limit($limit)->get();

        if ($restaurants->isEmpty() && $location) {
            $restaurants = Restaurant::whereHas('location', function ($query) use ($location) {
                $query->where('region', $location->region);
            })->limit($limit)->get();
        }

        if ($restaurants->isEmpty()) {
            $restaurants = Restaurant::limit($limit)->get();
        }

        return $restaurants;
    }
}
