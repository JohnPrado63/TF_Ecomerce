<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title', 'description', 'slug',
        'discount_percentage', 'start_date',
        'end_date', 'active', 'code',
        'applicable_packages',
    ];

    protected $casts = [
        'applicable_packages' => 'array',
        'active'              => 'boolean',
        'start_date'          => 'date',
        'end_date'            => 'date',
    ];

    // Verificar si la oferta está vigente
    public function isValid(): bool
    {
        return $this->active
            && now()->between($this->start_date, $this->end_date);
    }

    // Calcular precio con descuento
    public function applyDiscount(float $price): float
    {
        return round($price * (1 - $this->discount_percentage / 100), 2);
    }
}