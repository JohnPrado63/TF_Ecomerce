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
}
