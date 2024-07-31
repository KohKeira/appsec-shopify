<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {

        if (str_contains($request->getRequestUri(), "/api/")) {
            if ($e instanceof AuthenticationException) {
                return response(['message' => 'User not authenticated. Please login again'], 403);
            }
            if ($e instanceof ValidationException) {
                return response(['message' => 'Invalid data', "errors" => $e->errors()], 400);
            }
            if ($e instanceof NotFoundHttpException || $e instanceof ModelNotFoundException) {
                return response(['message' => 'Not found'], 404);
            }
            if ($e instanceof MethodNotAllowedHttpException) {
                return response(['message' => 'Method not allowed'], 405);

            }
        }

        return parent::render($request, $e);
    }
}
