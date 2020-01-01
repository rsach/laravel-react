<?php

namespace App\Http\Controllers;

use App\Order;
use App\Order_items;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Mockery\Exception;
use Tymon\JWTAuth\Exceptions\JWTException;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
//    public function index()
//    {
//
//
//        //
//    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        $user = auth('api')->user();
        $orders = Order::with('order_items.menu')->where('user_id','=' , $user->id)->get();


        return ResponseBuilder::success($orders);

        //
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
//    public function create()
//    {
//
//
//        //
//    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = auth('api')->user();



        $order_items = $request->get('data');
        $validate = Validator::make($order_items, [
            '*.menu_id' => 'exists:menus,id',
            '*.quantity' => 'required',
            '*.price' => 'required'
        ]);


        if ($validate->fails()) {
            return ResponseBuilder::error(422, null, ["errors" =>  $validate], 422);


        }






        $order = new Order();
        $order->currency = $request->get('currency');

        $order->user()->associate($user);
        $order->save();




            $order->order_items()->createMany($order_items);



        $order->save();


        $created_order = Order::with('order_items.menu')->where('id','=' , $order->id)->get();









//        $order->order_items()->attach($created_order_items);

        return ResponseBuilder::success($created_order);
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
//    public function show(Order $order)
//    {
//        //
//    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
//    public function edit(Order $order)
//    {
//        //
//    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
//    public function update(Request $request, Order $order)
//    {
//        //
//    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
//    public function destroy(Order $order)
//    {
//        //
//    }
}
