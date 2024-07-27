<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    //
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
        if (auth()->attempt(request(['email', 'password', 'role']))) {
            $user = auth()->user();
            $token = $user->createToken('api')->plainTextToken;
            $response = ['user' => $user, 'message' => 'User login Successfully', 'token' => $token];
            return response($response);
        } else {
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
