<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
//        Model::unguard();
//        DB::statement('SET FOREIGN_KEY_CHECKS=0;');


//         $this->call(UsersTableSeeder::class);


//
//        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
//        Model::reguard();
    }


    private function setFKCheckOff() {
//        switch(DB::getDriverName()) {
//            case 'mysql':
//                DB::statement('SET FOREIGN_KEY_CHECKS = 0');
//                break;
//            case 'sqlite':
//                DB::statement('PRAGMA foreign_keys = OFF');
//                break;
//        }
    }

    private function setFKCheckOn() {
//        switch(DB::getDriverName()) {
//            case 'mysql':
//                DB::statement('SET FOREIGN_KEY_CHECKS = 1');
//                break;
//            case 'sqlite':
//                DB::statement('PRAGMA foreign_keys = ON');
//                break;
//        }
    }
}
