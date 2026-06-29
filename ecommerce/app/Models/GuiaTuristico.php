<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuiaTuristico extends Model
{
    use HasFactory;
    protected $table = 'guias_turisticos';

    protected $fillable = [
        'nombre', 'apellido', 'idiomas',
        'telefono', 'credencial_nro'
    ];

    // Un guía pertenece a muchos paquetes
    public function tourPackages()
    {
        return $this->belongsToMany(TourPackage::class, 'package_guias', 'guia_id', 'package_id');
    }
}
