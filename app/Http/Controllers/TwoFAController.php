<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TwoFAController extends Controller
{

    public function verify2FA(Request $request)
    {
        $request->validate([
            'two_factor_code' => ['integer', 'required'],
        ]);
        $user = auth()->user();
        if ($request->two_factor_code !== (int) $user->two_factor_code) {
            return response(['message' => 'Invalid OTP. Please re-enter'], 400);
        }
        // reset code in db and verify user
        $user->resetCode();
        return ['message' => 'OTP verified. Login Successful', 'user' => $user];


    }
    public function resend()
    {
        $user = auth()->user();
        $user->generateCode('Shopify Verfication Code', $user->email);
        // return code for testing
        return ['message' => 'OTP resent. Check your inbox', 'code' => $user->two_factor_code];
        ;
    }

    public function checkVerified()
    {
        return [
            'message' =>
                'OTP verified'
        ];
    }

}
