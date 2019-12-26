<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $fillable = ['name', 'price', 'picture'];
    //
    public function order_items() {
        return $this->hasMany(Order_items::class);
    }
}
