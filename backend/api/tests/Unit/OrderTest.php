<?php

namespace Tests\Unit;

use App\Order;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderTest extends TestCase
{
    protected $token;
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }

    public function setUp(): void
    {
        parent::setUp();

        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test@123'),
        ]);

        $this->token = JWTAuth::fromUser($user);

        $products = factory(\App\Menu::class, 5)->create();



    }



    public function test_create_order() {





        $body = [
            "data" =>[
                ["menu_id" =>2,"quantity" =>3,"price" =>7],
                ["menu_id" =>5,"quantity" =>5,"price" =>4]
            ],"currency" =>"dollar"];



        $response  = $this->postJson(route('order.create'), $body, ['Authorization' => "Bearer $this->token"]);

        $response->assertStatus(200);


        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [
                "items" =>[
                    "*" => [
                    "id","user_id","currency","created_at","updated_at",
                        "order_items" => [
                            "*" => [
                                "id","menu_id","quantity","price","created_at","updated_at","order_id","menu" => ["id","name","price","picture","created_at", "updated_at"]
                            ]
                        ]
                        ]

                ]

            ]

        ]




        );


        $after_order_created = Order::all();


        $this->assertEquals(count($after_order_created), 1);



    }
    public function test_create_order_fail() {





        $body = [
            "data" =>[
                ["menu_id" =>112,"quantity" =>3,"price" =>7],
                ["menu_id" =>115,"quantity" =>5,"price" =>4]
            ],"currency" =>"dollar"];



        $response  = $this->postJson(route('order.create'), $body, ['Authorization' => "Bearer $this->token"]);

        $response->assertStatus(422);






        $after_order_created = Order::all();


        $this->assertEquals(count($after_order_created), 0);



    }


    public function test_getAll_order_for_logged_in_user() {





        $body = [
            "data" =>[
                ["menu_id" =>2,"quantity" =>3,"price" =>7],
                ["menu_id" =>5,"quantity" =>5,"price" =>4]
            ],"currency" =>"dollar"];



        $this->postJson(route('order.create'), $body, ['Authorization' => "Bearer $this->token"]);
        $this->postJson(route('order.create'), $body, ['Authorization' => "Bearer $this->token"]);

        $response = $this->getJson(route('orders'), ['Authorization' => "Bearer $this->token"]);
        $response->assertStatus(200);


        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [
                "items" =>[
                    "*" => [
                    "id","user_id","currency","created_at","updated_at",
                        "order_items" => [
                            "*" => [
                                "id","menu_id","quantity","price","created_at","updated_at","order_id","menu" => ["id","name","price","picture","created_at", "updated_at"]
                            ]
                        ]
                        ]

                ]

            ]

        ]




        );


        $after_order_created = Order::all();


        $this->assertEquals(count($after_order_created), 2);



    }



}
