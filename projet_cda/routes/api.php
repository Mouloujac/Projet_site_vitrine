<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/produits', 'App\Http\Controllers\produitController@index');
Route::post('/produits', 'App\Http\Controllers\produitController@store');
Route::put('/produits/{produit}', 'App\Http\Controllers\produitController@update');
Route::delete('/produits/{produit}', 'App\Http\Controllers\produitController@destroy');

Route::post('/paniers', 'App\Http\Controllers\panierController@store');
Route::get('/tailles', 'App\Http\Controllers\tailleController@index');
Route::get('/types', 'App\Http\Controllers\typeController@index');
Route::post('/stripe/payment', 'App\Http\Controllers\StripeController@makePayment');

Route::get('/commandes', 'App\Http\Controllers\commandeController@index');
Route::post('/commandes', 'App\Http\Controllers\commandeController@store');