<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JwtMiddleware extends BaseMiddleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return ResponseBuilder::error(401, null, ['status' => 'Token is Invalid'], 401);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return ResponseBuilder::error(401, null, ['status' => 'Token is Expired'], 401);

            }else{
                return ResponseBuilder::error(401, null, ['status' => 'Authorization Token not found'], 401);

            }
        }
        return $next($request);
    }
}
