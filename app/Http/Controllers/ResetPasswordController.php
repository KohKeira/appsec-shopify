<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class ResetPasswordController extends Controller
{
    public function sendResetCode(Request $request)
    {
        $request->validate([
            "email" => 'bail|required|email|exists:users'
        ]);
        $user = User::where('email', $request->email)->first();
        $user->generateCode('Shopify Reset Password Code');
        return ['message' => 'OTP generated. Please check your inbox', 'code' => $user->two_factor_code,];

    }

    public function checkResetCode(Request $request)
    {
        $request->validate([
            "email" => 'bail|required|email|exists:users',
            'code' => 'required|integer',
            'password' => [
                'bail',
                'required',
                Password::min(12)->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
                'confirmed'
            ],
            'password_confirmation' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
        if ($user->two_factor_code) {
            if ($user->two_factor_expires_at < now()) {
                $user->resetCode();
                return response(['message' => 'Code expired.'], 401);
            }

            if ($request->code !== (int) $user->two_factor_code) {
                return response(['message' => 'Invalid OTP. Please re-enter'], 400);
            }
            $user->update(['password' => $request->password]);
            $user->resetCode();
            $response = ['user' => $user, 'message' => 'Password updated successfully. Please login.'];
            return $response;
        }
        return response(['message' => 'Bad Request.'], 400);



    }
}
