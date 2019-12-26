<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order_items extends Model
{
    //
    protected $guarded = [];
    public function order() {
        return $this->belongsTo(Order::class, 'order_id');
    }
    public function menu() {
        return $this->belongsTo(Menu::class, 'menu_id');
    }
}
