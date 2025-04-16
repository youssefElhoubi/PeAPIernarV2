<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth;
use App\Http\Controllers\plant;
use App\Http\Controllers\Catigoie;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\saleController;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\Response;

Route::post("auth/singup", [auth::class, "signUP"]);
Route::post("auth/singin", [auth::class, "login"]);
Route::post("token/validate", function (Request $request) {
    $token = $request->header("Authorization");
    if (!$token) {
        return response()->json(["success" => false, "message" => "you do not have the access to this route"], Response::HTTP_UNAUTHORIZED);
    }
    $payload = JWT::decode($token, new Key(env("JWT_SECRET"), "HS256"));
    if ($payload->exp < time()) {
        return response()->json(["success" => false, "message" => "token has expired"], Response::HTTP_UNAUTHORIZED);
    }
    return response()->json(["success" => true, "data" => $payload], Response::HTTP_OK);
});

Route::middleware(["JWT_validate", "isAdmin"])->group(function () {
    Route::post("plant/add", [plant::class, "addPlant"]);
    Route::patch("plant/update/{id}", [plant::class, "updatePlant"]);
    Route::delete("plant/delete/{id}", [plant::class, "deletePlant"]);

    Route::post("category/add", [Catigoie::class, "addCategory"]);
    Route::patch("category/update/{id}", [Catigoie::class, "updateCategory"]);
    Route::delete("category/delete/{id}", [Catigoie::class, "deleteCategory"]);
    Route::get("category/all", [Catigoie::class, "AllCatigorie"]);

    Route::get("statistec/totalesales", [saleController::class, "totaleTales"]);
    Route::get("statistec/popularPlants", [saleController::class, "popularPlants"]);
    Route::get("statistec/salesByCatigory", [saleController::class, "salesByCatigory"]);
});

Route::middleware(["JWT_validate", "isClient"])->group(function () {
    Route::post("order/create", [OrderController::class, "createOrder"]);
    Route::patch("order/cancel/{id}", [OrderController::class, "cancelOrder"]);
    Route::get("order/orders", [OrderController::class, "myOrders"]);
});

Route::get("plants", [plant::class, "all"]);
Route::middleware(["JWT_validate"])->group(function () {
    Route::get("plant/{slug}", [plant::class, "getPlantBySlug"]);
    Route::patch("order/update/{id}", [OrderController::class, "updateStatus"]);
});
