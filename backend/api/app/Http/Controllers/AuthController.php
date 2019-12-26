<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;


class AuthController extends Controller
{
    public $loginAfterSignUp = true;

    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    }


    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {

            //pass validator errors as errors object for ajax response

            return ResponseBuilder::error(422, null, ['errors'=>$validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user;


        return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);




        if (!$token = auth('api')->attempt($credentials)) {
            return  ResponseBuilder::error(401, null,  ['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }
    public function getAuthUser(Request $request)
    {
        return ResponseBuilder::success(auth('api')->user());
    }
    public function logout()
    {
        auth('api')->logout();
        return  ResponseBuilder::success(['message'=>'Successfully logged out']);
    }
    protected function respondWithToken($token)
    {
        return ResponseBuilder::success([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

}
