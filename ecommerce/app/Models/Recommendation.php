<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;
    protected $fillable = [
        'client_id', 'package_id',
        'score', 'viewed'
    ];

    // Una recomendación pertenece a un cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Una recomendación pertenece a un paquete
    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class, 'package_id');
    }
}
