<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArchivesTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('archives', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('user_id');
			$table->text('panel_4')->nullable()->default(null);
			$table->text('panel_6')->nullable()->default(null);
			$table->text('panel_8')->nullable()->default(null);
			$table->text('panel_10')->nullable()->default(null);
			$table->text('panel_12')->nullable()->default(null);
			$table->timestamps();
		});
	}
	
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('archives');
	}
}
