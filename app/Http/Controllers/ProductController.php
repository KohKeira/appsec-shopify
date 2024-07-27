<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        return $user->products;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'bail|required|min:5',
            'desc' => 'bail|required|max:255',
            'quantity' => 'bail|required|integer',
            'price' => 'bail|required|decimal:0,2',
            'image' => 'bail|required|file'
        ]);

        $user = auth()->user();
        $product = Product::create([...$request->all(), 'quantity' => (int) $request->quantity, 'price' => (float) $request->price]);

        $file = request('image');
        if ($file) {
            $path = $file->storePublicly('products', 'public');
            $image = Storage::url($path);
            $product->update(["image" => $image]);
        }

        $user->products()->save($product);
        return ['message' => 'Product created succesfully', 'url' => $image];
    }


    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'bail|required|min:5',
            'desc' => 'bail|required|max:255',
            'quantity' => 'bail|required|integer',
            'price' => 'bail|required|decimal:0,2',
            'image' => 'bail|file'

        ]);
        $product->update([...$request->all(), 'quantity' => (int) $request->quantity, 'price' => (float) $request->price]);
        $file = request('image');
        if ($file) {
            $path = $file->storePublicly('products', 'public');
            $image = Storage::url($path);
            $product->update(["image" => $image]);
        }

        return ['message' => 'Product updated successful'];

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return ['message' => 'Product deleted successful'];

    }

    public function allProducts()
    {
        return Product::all();
    }
}
