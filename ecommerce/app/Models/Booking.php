<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'client_id', 'package_id', 'booking_date',
        'persons_quantity', 'include_hotel',
        'total_amount', 'status'
    ];

    // Una reserva pertenece a un cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Una reserva pertenece a un paquete
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class, 'package_id');
    }
}
