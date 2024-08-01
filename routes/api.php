<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\TwoFAController;
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
Route::middleware('throttle:3,5')->prefix('resetPassword')->group(function () {
    Route::post('/send', [ResetPasswordController::class, 'sendResetCode']);
    Route::post('/check', [ResetPasswordController::class, 'checkResetCode']);

});

Route::get('/products', [ProductController::class, 'allProducts']);

Route::get('/products/{product}', [ProductController::class, 'show']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);


    // route requiring 2fa
    Route::middleware('2fa')->group(function () {
        // for 2fa verification
        Route::get('verify/resend', [TwoFAController::class, 'resend']);
        Route::post('verify', [TwoFAController::class, 'verify2FA']);
        Route::get('/checkVerify', [TwoFAController::class, 'checkVerified']);

        // protected route for admin
        Route::middleware('role:admin')->apiResource('admin/users', UserController::class);

        // protected route for seller
        Route::middleware('role:seller')->prefix('seller')->group(function () {
            Route::apiResource('products', ProductController::class)->except('show');
            Route::get('/myOrders', [OrderController::class, 'getProductOrders']);
        });

        // protected route for courier
        Route::middleware('role:courier')->prefix('courier')->group(function () {
            Route::apiResource('deliveries', DeliveryController::class)->except('destroy');
            Route::get('/pendingOrders', [OrderController::class, 'getPendingOrders']);
        });

        // protected route for customer
        Route::middleware('role:customer')->apiResource('customer/orders', OrderController::class)->except(['update']);

    });


});

