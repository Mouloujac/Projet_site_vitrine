<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';


Route::resource('produits', App\Http\Controllers\produitController::class);

Route::resource('type', App\Http\Controllers\typeController::class);

Route::resource('panier', App\Http\Controllers\panierController::class);

Route::resource('user', App\Http\Controllers\userController::class);

Route::resource('taille', App\Http\Controllers\tailleController::class);

Route::resource('commande', App\Http\Controllers\commandeController::class);


