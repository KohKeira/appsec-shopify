<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return auth()->user()->deliveries;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'order_id' => 'bail|required|exists:orders,_id'
        ]);

        $delivery = Delivery::create(["status" => 'pending']);
        auth()->user()->orders()->save($delivery);

        $order = Order::find($request->order_id);
        $order->delivery()->save($delivery);
        //update order status
        $order->update(["status" => 'shipping']);
        // decrement product quantity
        $order->product()->decrement('quantity');


        return ['message' => 'Delivery accepted'];
    }

    /**
     * Display the specified resource.
     */
    public function show(Delivery $delivery)
    {
        if (auth()->user()->cannot('delete', $delivery)) {
            return response(['message' => 'Delivery not found'], 404);
        }
        return $delivery;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Delivery $delivery)
    {
        if (auth()->user()->cannot('delete', $delivery)) {
            return response(['message' => 'Delivery not found'], 404);
        }
        $delivery->update(['status' => 'completed']);
        $delivery->order()->update(['status' => 'completed']);
        return ['delivery' => $delivery, 'message' => 'Delivery completed'];
    }


}
