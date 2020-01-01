<?php

namespace Tests\Unit;

use App\Menu;
use Tests\TestCase;
use Tymon\JWTAuth\Facades\JWTAuth;

class MenuTest extends TestCase
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


    }
    public function test_get_products() {


        $products = factory(\App\Menu::class, 5)->create();





        $response  = $this->getJson(route('menu'), ['Authorization' => "Bearer $this->token"]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [
                "items" =>[ '*'=> [
                        "id","name","price","picture","created_at","updated_at"
                    ]
                    ]

            ]

        ]);



        $this->assertEquals(count($response->json('data.items')), 5);



    }


    public function test_create_product() {


        $products = factory(\App\Menu::class, 5)->create();





        $response  = $this->postJson(route('menu.create'), ["name" => "test", "price" => "test", "price" => 45, "picture" => "test"], ['Authorization' => "Bearer $this->token"]);

        $response->assertStatus(200);


        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [
                "item" =>[
                        "id","name","price","picture","created_at","updated_at"

                    ]

            ]

        ]);

        $after_product_created = Menu::all();


        $this->assertEquals(count($after_product_created), 6);



    }

    public function test_edit_product() {


        $products = factory(\App\Menu::class, 5)->create();


        $firstProduct = Menu::all()->first();
        $firstProduct->price = 232;

        $body = ["id" => $firstProduct->id, "price" => $firstProduct->price, "picture" => $firstProduct->picture, "name" => $firstProduct->name];




        $response  = $this->putJson(route('menu.update', $firstProduct->id), $body, ['Authorization' => "Bearer $this->token"]);

        $response->assertStatus(200);


        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [
                "item" =>[
                    "id","name","price","picture","created_at","updated_at"

                ]

            ]

        ]);





    }



}
