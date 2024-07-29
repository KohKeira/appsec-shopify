<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;
use PragmaRX\Google2FA\Google2FA;

class AuthController extends Controller
{
    // throttle login
    use AuthenticatesUsers;
    protected $maxAttempts = 5;
    protected $decayMinutes = 1;


    public function register(Request $request)
    {
        $request->validate(
            [
                'email' => 'bail|required|email|unique:users',
                'password' => [
                    'bail',
                    'required',
                    Password::min(12)->letters()
                        ->mixedCase()
                        ->numbers()
                        ->symbols()
                        ->uncompromised()
                ],
                'username' => 'bail|required|min:5|unique:users',
                'role' => 'bail|required|in:admin,seller,courier,customer'
            ]
        );

        $user = User::create($request->all());
        $response = ['user' => $user, 'message' => 'User Created Successfully'];
        return response($response, 201);
    }

    public function login(Request $request)
    {
        $request->validate(
            [
                'email' => 'bail|required|email',
                'password' => [
                    'bail',
                    'required'
                ],
                'role' => 'bail|required|in:admin,seller,courier,customer'
            ]
        );
        if (
            method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)
        ) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }
        if (auth()->attempt(request(['email', 'password', 'role']))) {
            $user = auth()->user();
            $token = $user->createToken('api')->plainTextToken;
            $user->generateCode();

            return ['message' => 'code generated. check inbox', 'token' => $token, 'code' => Crypt::decrypt($user->two_factor_code)];
        } else {
            // increment number of attempts
            $this->incrementLoginAttempts($request);

            return response(['message' => 'Invalid login credentials'], 400);
        }
    }

    public function logout()
    {
        auth()->user()->currentAccessToken()->delete();
        return response(['message' => 'Logged out successful']);
    }
    public function user()
    {
        return auth()->user();
    }


}
