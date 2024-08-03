<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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
                        ->uncompromised(),
                    'confirmed'
                ],
                'password_confirmation' => 'required',
                'username' => 'bail|required|min:5|unique:users',
                'role' => 'bail|required|in:seller,courier,customer'
            ]
        );

        $user = User::create($request->all());
        $response = ['user' => $user, 'message' => 'User Created Successfully'];
        return response($response, 201);

    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => 'bail|min:5|unique:users',
            'email' => 'bail|email|unique:users',
            'password' => [
                'bail',
                'required',
                Password::min(12)
                    ->mixedCase()->letters()->numbers()->symbols()->uncompromised()
            ]
        ]);


        $user->update($request->all());
        return ['message' => 'User updated successful'];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return ['message' => 'User deleted successful'];

    }


}
