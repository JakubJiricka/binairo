<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Leaderboard extends Model
{
    //
	protected $table = 'leaderboards';
	public static function saveScore($string){
		$user_id = auth()->user()->id;
		$current_date = date('Y-m-d');
		$users = Leaderboard::where('user_id', $user_id)->get();
		
		$row = new Leaderboard();
		$row->user_id = $user_id;
		$row->endtime = $string;
		$flag = 0;
		foreach ($users as $user) {
			$date = date('Y-m-d',strtotime($user->updated_at));
			if($date == $current_date) {
				$leaderboard = Leaderboard::find($user->id);
				
				if($leaderboard->endtime > $string){
					$leaderboard->endtime = $string;
					$leaderboard->save();
					$flag = 1;
					return(auth()->user()->name);
				}
			}
//			$leaderboard = Leaderboard::find($user->id);
//			if($leaderboard->endtime > $string){
//				$leaderboard->endtime = $string;
//				$leaderboard->save();
//				$flag = 1;
//				return(auth()->user()->name);
//			}
		}
		if(!$flag){
			$row->save();
			return(auth()->user()->name);
		}
	}
	
	public static function load_data(){
		$items =  Leaderboard::OrderBy('updated_at', 'desc')->limit(5)->get();
		foreach($items as $item) {
			$item->name = User::find($item->user_id)->name;
		}
		return $items->toArray();
	}
}
