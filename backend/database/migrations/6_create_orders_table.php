<?php

use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use MongoDB\Laravel\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            // $table->foreignIdFor(Product::class)->constrained()->cascadeOnDelete();
            // $table->foreignIdFor(OrderStatus::class)->constrained()->cascadeOnDelete();
            // $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
