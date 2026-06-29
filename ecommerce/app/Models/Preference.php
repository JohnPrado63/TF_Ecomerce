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
        'preferred_activity'
    ];

    // Una preferencia pertenece a un cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
