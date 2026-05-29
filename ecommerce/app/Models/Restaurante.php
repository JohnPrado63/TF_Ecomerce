<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurante extends Model
{
    protected $table = 'restaurantes';

    protected $fillable = [
        'location_id', 'nombre',
        'tipo_comida', 'direccion'
    ];

    // Un restaurante pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
