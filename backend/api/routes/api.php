<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products', 'MenuController@get')->name('menu');

Route::post('/products', 'MenuController@create')->name('menu.create');
Route::put('/product/{product}', 'MenuController@edit')->name('menu.update');

Route::get('/orders', 'OrderController@get')->name('orders');
Route::post('/orders', 'OrderController@store')->name('order.create');



Route::post('/register', 'AuthController@register')->name('register');
Route::post('/login', 'AuthController@login')->name('login');
Route::get('/logout', 'AuthController@logout')->name('logout');
Route::get('/user', 'AuthController@getAuthUser')->name('user');
