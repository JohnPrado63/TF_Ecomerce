<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $table = 'hoteles';

    protected $fillable = [
        'location_id', 'nombre',
        'estrellas', 'direccion', 'telefono'
    ];

    // Un hotel pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Un hotel pertenece a muchos paquetes
    public function tourPackages()
    {
        return $this->belongsToMany(TourPackage::class, 'package_hoteles', 'hotel_id', 'package_id');
    }
}
