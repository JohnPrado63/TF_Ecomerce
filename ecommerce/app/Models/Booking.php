<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'client_id', 'package_id', 'booking_date',
        'persons_quantity', 'include_hotel','guide_id',
        'offer_id','discount_amount',
        'hotel_id', 'restaurante_id',
        'total_amount', 'status','order_number'
    ];
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            $booking->order_number = 'ESKY-' . strtoupper(substr(uniqid(), -6));
        });
    }

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

    // Hotel seleccionado para la reserva
    public function hotel()
    {
        return $this->belongsTo(Hotel::class, 'hotel_id');
    }

    // Restaurante seleccionado para la reserva
    public function restaurante()
    {
        return $this->belongsTo(Restaurante::class, 'restaurante_id');
    }
    public function guide()
    {
        return $this->belongsTo(GuiaTuristico::class, 'guide_id');
    }

    // Una reserva tiene muchos pagos
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
