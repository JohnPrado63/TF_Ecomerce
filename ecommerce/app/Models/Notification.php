<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'client_id', 'title',
        'message', 'is_read'
    ];

    // Una notificación pertenece a un cliente
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
