<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use PragmaRX\Google2FA\Google2FA;

class TwoFAController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'two_factor_code' => ['integer', 'required'],
        ]);
        $user = auth()->user();
        if ($request->two_factor_code !== Crypt::decrypt($user->two_factor_code)) {
            return response(['message' => 'Invalid OTP. Please re-enter'], 400);
        }
        // reset code in db and verify user
        $user->resetCode();
        return ['message' => 'OTP verified. Login Successful'];


    }
    public function resend()
    {
        $user = auth()->user();
        $user->generateCode();
        return ['message' => 'OTP resent. Check your inbox'];
        ;
    }

}
