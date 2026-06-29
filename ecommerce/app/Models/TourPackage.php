<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'location_id', 'title',
        'description', 'price', 'duration_days',
        'includes_guide', 'includes_food',
        'includes_hotel', 'image_url',
        'available_slots', 'status'
    ];

    // Un paquete pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Un paquete pertenece a una ubicación
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Un paquete tiene muchas reservas
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'package_id');
    }

    // Un paquete tiene muchas reseñas
    public function reviews()
    {
        return $this->hasMany(Review::class, 'package_id');
    }

    // Un paquete tiene muchos hoteles (muchos a muchos)
    public function hoteles()
    {
        return $this->belongsToMany(Hotel::class, 'package_hoteles', 'package_id', 'hotel_id');
    }

    // Un paquete tiene muchos guías (muchos a muchos)
    public function guias()
    {
        return $this->belongsToMany(GuiaTuristico::class, 'package_guias', 'package_id', 'guia_id');
    }

    // Un paquete tiene muchos restaurantes (muchos a muchos)
    public function restaurantes()
    {
        return $this->belongsToMany(Restaurante::class, 'package_restaurantes', 'package_id', 'restaurante_id');
    }

    // Un paquete tiene muchas empresas de transporte (muchos a muchos)
    public function transportes()
    {
        return $this->belongsToMany(EmpresaTransporte::class, 'package_transportes', 'package_id', 'empresa_transporte_id');
    }
}
