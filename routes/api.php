<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'allProducts']);

Route::get('/products/{product}', [ProductController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // protected route for admin
    Route::middleware('role:admin')->apiResource('admin/users', UserController::class);

    Route::middleware('role:seller')->prefix('seller')->group(function () {
        Route::apiResource('products', ProductController::class)->except('show');
        Route::get('/myOrders', [OrderController::class, 'getProductOrders']);
    });
    Route::middleware('role:courier')->prefix('courier')->group(function () {
        Route::apiResource('deliveries', DeliveryController::class)->except('destroy');
        Route::get('/pendingOrders', [OrderController::class, 'getPendingOrders']);
    });
    Route::middleware('role:customer')->apiResource('customer/orders', OrderController::class)->except(['update']);

});

