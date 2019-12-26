<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Menu;
use Faker\Generator as Faker;

$factory->define(Menu::class, function (Faker $faker) {
    return [
        //
            'name' => $faker->name,
            'price' => $faker->numberBetween(0, 10),
            'picture' => $faker->imageUrl()
    ];
});
