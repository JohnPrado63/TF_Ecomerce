<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'first_name', 'last_name',
        'document_type', 'document_number',
        'phone', 'address', 'birth_date'
    ];

    // Un cliente pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    // Un cliente tiene muchas reservas
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    // Un cliente tiene muchas reseñas
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Un cliente tiene preferencias
    public function preferences()
    {
        return $this->hasMany(Preference::class);
    }

    // Un cliente tiene recomendaciones
    public function recommendations()
    {
        return $this->hasMany(Recommendation::class);
    }
}