<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'package_id', 'score',
        'viewed', 'interaction_type', 'session_id', 'view_duration'
    ];

    protected $casts = [
        'viewed' => 'boolean',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class, 'package_id');
    }

    public function markAsViewed($sessionId = null, $duration = null)
    {
        $this->update([
            'viewed' => true,
            'interaction_type' => 'view',
            'session_id' => $sessionId,
            'view_duration' => $duration,
        ]);
    }

    public function markAsClicked($sessionId = null)
    {
        $this->update([
            'interaction_type' => 'click',
            'session_id' => $sessionId,
        ]);
    }

    public function markAsSaved($sessionId = null)
    {
        $this->update([
            'interaction_type' => 'save',
            'session_id' => $sessionId,
        ]);
    }

    public function getScoreLevelAttribute()
    {
        if ($this->score >= 70) {
            return 'excellent';
        }
        if ($this->score >= 40) {
            return 'good';
        }
        return 'low';
    }
}
