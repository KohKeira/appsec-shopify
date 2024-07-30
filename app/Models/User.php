<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Mail\SendCodeMail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use MongoDB\Laravel\Relations\HasMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $connection = 'mongodb';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'role',
        'two_factor_code',
        'two_factor_expires_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_code',
        'two_factor_expires_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'two_factor_expires_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    public function deliveries(): HasMany
    {
        return $this->hasMany(Delivery::class);
    }

    public function generateCode(): void
    {
        $this->timestamps = false;  // Prevent updating the 'updated_at' column
        $this->two_factor_code = Crypt::encrypt(rand(100000, 999999));  // Generate a random six digit code
        $this->two_factor_expires_at = now()->addMinutes(5);  // code valid for 5 minutes
        $this->save();
        $details = [
            'code' => Crypt::decrypt($this->two_factor_code)
        ];

        // Mail::to(auth()->user()->email)->send(new SendCodeMail($details));
    }
    public function resetCode(): void
    {
        $this->timestamps = false;
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }
}
