<?php

namespace Tests\Unit;

use App\Http\Middleware\JwtMiddleware;
use Illuminate\Http\Request;
use Mockery\Matcher\Closure;
use Tests\TestCase;

use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Tymon\JWTAuth\Facades\JWTAuth; //use this library


class MiddlewareTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
    public function jwt_auth() {
        $request = new Request;

        $jwt_middleware = new JwtMiddleware;



        $res = $jwt_middleware->handle($request, new Closure());

        $this->assertEquals($res, ResponseBuilder::error(401, null, ['status' => 'Authorization Token not found'], 401));



    }

    public function jwt_auth_invalid() {
        $request = new Request();

        $request->header(['Authorization' =>  'Bearer abv']);

        $jwt_middleware = new JwtMiddleware;

        $res = $jwt_middleware->handle($request, new Closure());

        $this->assertEquals($res, ResponseBuilder::error(401, null, ['status' => 'Token is Invalid'], 401));



    }

    public function jwt_auth_expired() {
        $request = new Request();

        $request->header(['Authorization' =>  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU3NzM3ODkzNCwiZXhwIjoxNTc3MzgyNTM0LCJuYmYiOjE1NzczNzg5MzQsImp0aSI6Ik15SmViZDNmY0dubUIzTVgiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.shZwjH84bcdGvItrWAesb3EEIBr-ITusK7r3A_mXrxg']);

        $jwt_middleware = new JwtMiddleware;

        $res = $jwt_middleware->handle($request, new Closure());

        $this->assertEquals($res, ResponseBuilder::error(401, null, ['status' => 'Token is Expired'], 401));



    }






}
