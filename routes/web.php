<?php

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

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth']], function(){
	Route::get('/', function () {
		return view('welcome');
	});
	
	Route::post('/save', 'HomeController@save');
	Route::post('/load', 'HomeController@load');
	Route::post('/savescore', 'HomeController@saveScore');
});

Auth::routes();


