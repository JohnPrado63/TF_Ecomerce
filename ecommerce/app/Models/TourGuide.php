<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourGuide extends Model
{
    use HasFactory;
    protected $table = 'tour_guides';

    protected $fillable = [
        'first_name', 'last_name', 'languages',
        'phone', 'credential_number'
    ];

    public function tourPackages()
    {
        return $this->belongsToMany(TourPackage::class, 'package_tour_guides', 'tour_guide_id', 'package_id');
    }
}
