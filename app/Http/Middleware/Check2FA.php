<?php

namespace App\Http\Middleware;

use App\Support\Google2FAAuthenticator;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class Check2FA
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        // check if code exist in database (user has not verify with code)
        if ($user->two_factor_code) {
            // reset code and log user out if code expired
            if ($user->two_factor_expires_at < now()) {
                $user->resetTwoFactorCode();
                $user->currentAccessToken()->delete();
                return response(['message' => 'Code expired. Please login again'], 401);
            }

            // if request is not with route /verify and user is not verified, 
            // request for otp

            if (!$request->is('api/verify*')) {
                return response([
                    'message' => 'Two-factor authentication is required.'
                ], 403);
            }

        }
        // proceed with request if user has been verified (i.e. no code exist in db) or
        // if user is requesting to verify OTP
        return $next($request);
    }
}
