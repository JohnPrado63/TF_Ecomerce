<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransportCompany extends Model
{
    use HasFactory;
    protected $table = 'transport_companies';

    protected $fillable = [
        'location_id', 'company_name',
        'transport_type', 'contact'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
