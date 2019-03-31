<?php

namespace App\Http\Controllers;

use App\Archive;
use App\Leaderboard;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
	
	public function save(Request $request)
	{
		$count = $request->input('grid_count');
		$string = $request->input('string');
		Archive::save_data($count, json_encode($string));
	}
	
	public function load(Request $request)
	{
		$count = $request->input('grid_count');
		$date = $request->input('date');
		$leaderboards = Leaderboard::load_data();
		return json_encode(array('grid' => json_decode(Archive::load_data($count, $date)), 'leaderboards' => $leaderboards));
	}
	
	public function saveScore(Request $request){
		$count = $request->input('grid_count');
        $string = $request->input('string');
		Archive::save_data($count, '1');
        return json_encode(array('name' => Leaderboard::saveScore($string)));
	}
}
