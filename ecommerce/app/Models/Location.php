<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'city', 'region', 'address',
        'latitude', 'longitude'
    ];

    // Una ubicación tiene muchos paquetes
    public function tourPackages()
    {
        return $this->hasMany(TourPackage::class);
    }

    // Una ubicación tiene muchos hoteles
    public function hoteles()
    {
        return $this->hasMany(Hotel::class);
    }

    // Una ubicación tiene muchos restaurantes
    public function restaurantes()
    {
        return $this->hasMany(Restaurante::class);
    }
}
