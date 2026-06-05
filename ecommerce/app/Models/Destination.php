<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'location_id',
        'name',
        'slug',
        'description',
        'summary',
        'style',
        'recommendation',
        'sites',
    ];

    protected $casts = [
        'sites' => 'json',
    ];

    // Una destino pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
