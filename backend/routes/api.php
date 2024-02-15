<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->group(function(){
//     Route::post('/logout',[AuthController::class,'logout']);
// });

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);

    Route::get('/getAllUsers',[TaskController::class,'getAllUsers']);
    Route::post('/createTask',[TaskController::class,'createTask']);
    Route::get('/allTasks',[TaskController::class,'getAllTasks']);
    Route::get('/getTask/{id}',[TaskController::class,'getTask']);
    Route::put('/task/updateTask/{id}',[TaskController::class,'updateTask']);
    Route::delete('/deleteTask/{id}',[TaskController::class,'deleteTask']);

    Route::get('/getMytasks/{id}',[TaskController::class,'getMyTask']);

});

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
