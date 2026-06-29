<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'preferred_budget',
        'preferred_duration', 'preferred_category',
        'preferred_activity', 'preferred_destinations',
        'traveler_type', 'activity_level'
    ];

    protected $casts = [
        'preferred_destinations' => 'array',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function getTravelerTypeLabelAttribute()
    {
        $labels = [
            'adventurer' => 'Aventureño',
            'cultural' => 'Cultural',
            'relaxed' => 'Relajado',
            'gastronomic' => 'Gastronómico',
            'spiritual' => 'Espiritual',
            'ecotourist' => 'Ecoturista',
        ];
        return $labels[$this->traveler_type] ?? null;
    }

    public function getActivityLevelLabelAttribute()
    {
        $labels = [
            'low' => 'Bajo (Caminatas suaves)',
            'moderate' => 'Moderado (Actividad regular)',
            'high' => 'Alto (Desafiante)',
            'extreme' => 'Extremo (Para expertos)',
        ];
        return $labels[$this->activity_level] ?? null;
    }

    public function getCategoriesArrayAttribute()
    {
        if (!$this->preferred_category) {
            return [];
        }
        return array_filter(array_map('trim', explode(',', $this->preferred_category)));
    }
}
