<?php

namespace Tests\Unit;

use Tests\TestCase;

use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Tymon\JWTAuth\Facades\JWTAuth; //use this library


class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_can_create_user() {
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'admin@123',
        ];
         $response  = $this->post(route('register'), $data);

            $response->assertStatus(200);
            $response->assertJsonStructure([
                "success",
                "code",
                "locale",
                "message",
                "data" => [
                    "access_token",
                    "token_type",
                    "expires_in"
                ]

            ]);

            $token = $response->json('data.access_token');
            $decodedToken = json_decode(JWTAuth::setToken($token)->toUser()->toJson(), true);

            $this->assertEquals(
                ['name' => $data['name'], 'email' => $data['email']],
                ['name' => $decodedToken['name'], 'email' => $decodedToken['email']]
            );

    }

    public function testUserLoginSuccessfully()
    {
        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test@123'),
        ]);

        $payload = ['email' => 'testlogin@user.com', 'password' => 'test@123'];

        $this->post(route('login'), $payload)
            ->assertStatus(200)
            ->assertJsonStructure([
                "success",
                "code",
                "locale",
                "message",
                "data" => [
                    "access_token",
                    "token_type",
                    "expires_in"
                ]
            ]);

    }


    public function testUserLoginFail()
    {
        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test@1234'),
        ]);

        $payload = ['email' => 'testlogin@user.com', 'password' => 'test@123'];

        $this->post(route('login'), $payload)
            ->assertStatus(401)
            ->assertJson([
                "success" => false,
                "code" => 401,
                "locale" => "en",
                "message" => "Error #401",
                "data" => [
                    'error' => 'Unauthorized'
                ]
            ]);

    }

    public function testsRequiresPasswordEmailAndName()
    {
       $response =  $this->json('post', '/api/register');
            $response->assertStatus(422);



            $response->assertJson([
                "success" => false,
                "code" => 422,
                "locale" => "en",
                "message" => "Error #422",
                "data" => [
                    "errors" => [
                            'name' => ['The name field is required.'],
                            'email' => ['The email field is required.'],
                            'password' => ['The password field is required.'],
                        ]
                    ]
            ]);
    }

    public function test_get_from_auth_token_user() {
        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test@123'),
        ]);

        $token = JWTAuth::fromUser($user);


        $response = $this->getJson(route('user'),['Authorization' => "Bearer $token"]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            "success",
            "code",
            "locale",
            "message",
            "data" => [

                    "item" => ["id","name","email","email_verified_at","created_at","updated_at"]

            ]

        ]);



    }

    public function token_invalid() {



        $response = $this->getJson(route('user'),['Authorization' => "Bearer abc"]);

        $response->assertStatus(401);
        $response->assertJson([
            "success"  => false,
            "code"  => 401,
            "locale" => "en",
            "message" => "Error #401",
            "data" => [

                "status" => "Token is Invalid"

            ]

        ]);



    }

    public function token_not_found() {



        $response = $this->getJson(route('user'));

        $response->assertStatus(401);
        $response->assertJson([
            "success"  => false,
            "code"  => 401,
            "locale" => "en",
            "message" => "Error #401",
            "data" => [

                "status" => "Authorization Token not found"

            ]

        ]);



    }


    public function test_logout_from_auth_token_user() {
        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test@123'),
        ]);

        $token = JWTAuth::fromUser($user);


        $response = $this->getJson(route('logout'),['Authorization' => "Bearer $token"]);

        $response->assertStatus(200);





    }




}
