<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';

    protected $fillable = [
        'status'
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function delivery(): HasOne
    {
        return $this->hasOne(Delivery::class);
    }
}

