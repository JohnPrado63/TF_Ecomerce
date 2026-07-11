<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'city', 'region', 'address',
        'latitude', 'longitude'
    ];

    // Una ubicación tiene muchos paquetes
    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }

    // A location has many hotels
    public function hotels()
    {
        return $this->hasMany(Hotel::class);
    }

    // A location has many restaurants
    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }
}
