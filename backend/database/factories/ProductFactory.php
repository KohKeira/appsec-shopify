<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's defau,lt state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(5, true),
            'dec' => fake()->realText(),
            'quantity' => fake()->randomDigit(),
            'price' => fake()->randomFloat(2, 10, 100),
            'user_id' => User::where('role', 'seller')->first()->_id
        ];
    }
}
