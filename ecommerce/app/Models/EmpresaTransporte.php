<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmpresaTransporte extends Model
{
    use HasFactory;
    protected $table = 'empresas_transporte';

    protected $fillable = [
        'location_id', 'nombre_empresa',
        'tipo_transporte', 'contacto'
    ];

    // Una empresa pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
