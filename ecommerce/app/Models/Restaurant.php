<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;
    protected $table = 'restaurants';

    protected $fillable = [
        'location_id', 'name',
        'cuisine_type', 'address',
        'price_per_person'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
