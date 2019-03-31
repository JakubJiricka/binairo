<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archive extends Model
{
    //
	protected $table = 'archives';
	public static function save_data($count, $string){
		$user_id = auth()->user()->id;
		$current_date = date('Y-m-d');
		$users = Archive::where('user_id', $user_id)->get();
		
		$row = new Archive();
		$row->user_id = $user_id;
		$col_name = 'panel_' . $count;
		$row->$col_name = $string;
		$flag = 0;
		foreach ($users as $user) {
			$date = date('Y-m-d',strtotime($user->updated_at));
			if($date == $current_date) {
				$archive = Archive::find($user->id);
				$archive->$col_name = $string;
				$archive->save();
				$flag = 1;
			}
			
		}
		if(!$flag)  $row->save();
	}
	
	public static function load_data($count, $date){
		$user_id = auth()->user()->id;
		$users = Archive::where('user_id', $user_id)->get();
		$col_name = 'panel_' . $count;
		$load_date = date('Y-m-d',strtotime($date));

		foreach ($users as $user) {
			$updated_date = date('Y-m-d',strtotime($user->updated_at));
			if($load_date == $updated_date) {
				$archive = Archive::find($user->id);
				return $archive->$col_name;
			}
		}
		
		return '0';
	}
}
