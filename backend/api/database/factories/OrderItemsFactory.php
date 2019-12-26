<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Order_items;
use Faker\Generator as Faker;

$factory->define(Order_items::class, function (Faker $faker) {
    return [
        //
            'order_id' => factory(\App\Order::class),
            'menu_id' => factory(\App\Order::class),
            'quantity' => $faker->numberBetween(0,10),
            'price' => $faker->numberBetween(0, 100),
    ];
});
