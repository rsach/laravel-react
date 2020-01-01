<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeyToOrder extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
//            $table->unsignedBigInteger('order_item_id');
//            $table->unsignedBigInteger('user_id');
//
////            $table->unique([ 'user_id']);
//
//            $table->foreign('user_id')->references('id')->on('users');
//            $table->foreign('order_item_id')->references('id')->on('order_items');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            //
//            $table->dropForeign([ 'user_id']);
////            $table->dropUnique([ 'user_id']);
//            $table->dropColumn([ 'user_id']);

        });
    }
}
