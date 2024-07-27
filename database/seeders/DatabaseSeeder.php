<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Delivery;
use App\Models\DeliveryStatus;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);





        User::create([
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => 'admin@Sh0pify',
            'role' => 'admin'
        ]);

        // Product::factory(5)->create();

    }
}
