<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use MarcinOrlowski\ResponseBuilder\ResponseBuilder;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {

        return ResponseBuilder::error(404, null, ["error" => "route not found"], 404);
    }
}
