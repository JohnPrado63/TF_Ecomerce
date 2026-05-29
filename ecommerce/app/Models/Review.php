<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'client_id', 'package_id',
        'rating', 'comment'
    ];

    // Una reseña pertenece a un cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Una reseña pertenece a un paquete
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class, 'package_id');
    }
}