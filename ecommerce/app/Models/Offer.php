<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'discount_percentage',
        'details',
        'benefits',
        'active',
    ];

    protected $casts = [
        'benefits' => 'json',
        'active' => 'boolean',
    ];
}
