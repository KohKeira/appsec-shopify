<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->orders()->with('product')->get()->sortBy(function ($order) {
            $statusOrder = ['pending' => 1, 'shipping' => 2, 'completed' => 3];
            return $statusOrder[$order->status];
        })->values()->all()
        ;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'bail|required|exists:products,_id'
        ]);
        $product = Product::find($request->product_id);
        if ((int) $product->quantity === 0) {
            return response(["message" => "Product out of stock"], 400);
        }
        $order = Order::create(["status" => 'pending']);
        auth()->user()->orders()->save($order);
        $product->orders()->save($order);

        return ["message" => "Order made.", "order" => $order];
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if (auth()->user()->cannot('delete', $order)) {
            return response(['message' => 'Order not found'], 404);

        }
        $status = $order->status;
        if ($status === 'pending') {
            $order->delete();
            return ['message' => 'Order deleted'];
        }
        return response(['message' => "Order is already $status. Unable to cancel order."], 400);

    }

    public function getPendingOrders()
    {
        return Order::where('status', 'pending')->get();
    }

    public function getProductOrders()
    {
        $products = auth()->user()->products()->pluck('_id')->toArray();

        return Order::whereIn('product_id', $products)->with('user:username')->with('product:name')->get();
    }
}
