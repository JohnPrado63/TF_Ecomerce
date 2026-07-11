<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PackageInteraction extends Model
{
    use HasFactory;

    protected $fillable = [
        'package_id', 'client_id', 'session_id',
        'type', 'duration_seconds', 'search_query'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function package()
    {
        return $this->belongsTo(TourPackage::class, 'package_id');
    }

    public static function recordView($packageId, $clientId = null, $sessionId = null, $duration = null, $searchQuery = null)
    {
        return self::create([
            'package_id' => $packageId,
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'type' => 'view',
            'duration_seconds' => $duration,
            'search_query' => $searchQuery,
        ]);
    }

    public static function recordClick($packageId, $clientId = null, $sessionId = null, $searchQuery = null)
    {
        return self::create([
            'package_id' => $packageId,
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'type' => 'click',
            'search_query' => $searchQuery,
        ]);
    }

    public static function recordSave($packageId, $clientId = null, $sessionId = null)
    {
        return self::create([
            'package_id' => $packageId,
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'type' => 'save',
        ]);
    }

    public static function recordCompare($packageId, $clientId = null, $sessionId = null)
    {
        return self::create([
            'package_id' => $packageId,
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'type' => 'compare',
        ]);
    }

    public static function recordHover($packageId, $clientId = null, $sessionId = null, $duration = null)
    {
        return self::create([
            'package_id' => $packageId,
            'client_id' => $clientId,
            'session_id' => $sessionId,
            'type' => 'hover',
            'duration_seconds' => $duration,
        ]);
    }
}
