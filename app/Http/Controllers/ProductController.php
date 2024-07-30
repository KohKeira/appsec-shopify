<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
        if ($request->user()->cannot('update', $product)) {
            return response(['message' => 'Product not found'], 404);
        }
        $request->validate([
            'name' => 'min:5',
            'desc' => 'max:255',
            'quantity' => 'integer',
            'price' => 'decimal:0,2',
            'image' => 'file'

        ]);
        $product->update($request->all());
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
        if (auth()->user()->cannot('delete', $product)) {
            return response(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return ['message' => 'Product deleted successful'];

    }

    public function allProducts()
    {
        return Product::all();
    }
}
