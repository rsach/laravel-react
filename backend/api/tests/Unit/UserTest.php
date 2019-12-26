<?php

namespace Tests\Unit;

use Tests\TestCase;

use MarcinOrlowski\ResponseBuilder\ResponseBuilder;


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
            'password' => $this->faker->password,
        ];
         $response  = $this->post(route('register'), $data);

            $response->assertStatus(200);
            $response->assertJsonStructure([
                "success",
                "code",
                "locale",
                "message",
                "data" => [
                    "access_token" => [
            "name",
            "email",
            "updated_at",
            "created_at",
            "id"
        ],
        "token_type",
        "expires_in"
        ]

            ]);

    }

    public function testUserLoginSuccessfully()
    {
        $user = factory(\App\User::class)->create([
            'email' => 'testlogin@user.com',
            'password' => bcrypt('test123'),
        ]);

        $payload = ['email' => 'testlogin@user.com', 'password' => 'test123'];

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



}
