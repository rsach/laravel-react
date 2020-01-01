<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('user_id');
            $table->string('currency');


//            $table->unique([ 'user_id']);

            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        $table->dropForeign([ 'user_id']);
////            $table->dropUnique([ 'user_id']);
//        $table->dropColumn([ 'user_id']);
//        DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        DB::table('orders')->delete();
//        DB::statement('SET FOREIGN_KEY_CHECKS = 1');

    }
}
