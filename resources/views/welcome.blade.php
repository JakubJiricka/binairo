<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<title>Binairo</title>
	<meta name="description" content="A little logic puzzle." />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
	<meta name="format-detection" content="telephone=no">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	
	{{--<link rel="icon" type="image/png" href="{{ asset('images/icon-1024.png') }}" />--}}
	{{--<link rel="shortcut icon" href="{{ asset('images/icon-1024.png') }}" />--}}
	{{--<link rel="apple-touch-icon-precomposed" href="{{ asset('images/icon-1024.png') }}"/>--}}
	
	<meta name="msapplication-tap-highlight" content="no" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="apple-mobile-web-app-capable" content="yes"/>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
	
	<meta name="twitter:card" content="photo" />
	<meta name="twitter:site" content="@cetinerhalil" />
	<meta name="twitter:title" content="binairo" />
	<meta name="twitter:description" content="a little logic puzzle." />
	
	<meta property="og:site_name" content="binairo" />
	<meta property="og:title" content="binairo" />
	<meta property="og:description" content="a little logic puzzle." />
	<meta property="og:type" content="website" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<style>html,body{background:#f6f6f6;}</style>
	<link href="{{ asset('css/app.css') }}" type="text/css" rel="stylesheet" />
	
	<!-- Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
	
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	
	<!-- Styles -->
	<style>
		html, body {
			background-color: #fff;
			color: #636b6f;
			font-family: 'Nunito', sans-serif;
			font-weight: 200;
			height: 100vh;
			margin: 0;
		}
		
		.full-height {
			height: 100vh;
		}
		
		.flex-center {
			align-items: center;
			display: flex;
			justify-content: center;
		}
		
		.position-ref {
			position: relative;
		}
		
		.top-right {
			position: absolute;
			right: 10px;
			top: 18px;
		}
		
		.links > a {
			color: #636b6f;
			padding: 0 25px;
			font-size: 13px;
			font-weight: 600;
			letter-spacing: .1rem;
			text-decoration: none;
			text-transform: uppercase;
		}
	</style>
</head>
<body>
<div class="flex-center position-ref full-height">

	<div class="card border-success mb-3 mt-5 hidden" style="display: none;">
		<div class="card-header bg-transparent" style="font-size: 35px;">Leaderboard</div>
		<div class="card-body text-success">
			<nav>
				<div class="nav nav-tabs" id="nav-tab" role="tablist">
					<a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Today</a>
					<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">This Month</a>
					<a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">All Time</a>
				</div>
			</nav>
			<div class="tab-content" id="nav-tabContent">
				<div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
					<ul class="list-group today">
						{{--<li class="list-group-item list-group-item-success text-left"><span class="mr-5">1.</span>Paul Smith: 23s</li>--}}
						{{--<li class="list-group-item list-group-item-success text-left"><span class="mr-5">2.</span>Jakub Jiricka: 40s</li>--}}
					</ul>
				</div>
				<div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
					<ul class="list-group">
						<li class="list-group-item list-group-item-success text-left"><span class="mr-5">1.</span>Paul Smith: 23s</li>
						<li class="list-group-item list-group-item-success text-left"><span class="mr-5">2.</span>Jakub Jiricka: 40s</li>
					</ul>
				</div>
				<div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
					<ul class="list-group">
						<li class="list-group-item list-group-item-success text-left"><span class="mr-5">1.</span>Paul Smith: 23s</li>
						<li class="list-group-item list-group-item-success text-left">J<span class="mr-5">2.</span>akub Jiricka: 40s</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="card-footer bg-transparent border-success"></div>
	 </div>



	@if (Route::has('login'))
		<div class="top-right links">
			@auth
				<a href="javascript:;" class="text-success font-weight-bold d-none completed">Completed</a>
				<a href="{{ url('/') }}">Home</a>
				<a href="javascript:toggleCalendar();" class="achive">Archive</a>
				<a href="{{ route('logout') }}"
				   onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
					{{ __('Logout') }}
				</a>
				
				<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
					@csrf
				</form>
			@else
				<a href="{{ route('login') }}">Login</a>
				
				@if (Route::has('register'))
					<a href="{{ route('register') }}">Register</a>
				@endif
			@endauth
		</div>
	@endif
</div>


<div id="container">
	<div id="title" class="screen show01 hide0 hide1 hidehs" data-action="close-titleScreen">
		<div class="vertical text-center">
			<h1>
				<span class="firstleft">bin</span><span class="firstright">airo</span>
			</h1>
			<div id="titlegrid" class="board">
				<div id="digits">
					<span id="zero" data-action="play">Play</span><span id="one" data-action="about">About</span>
				</div>
				<table data-grid="titlegrid" cellpadding="0" cellspacing="0">
					<tbody>
					<tr>
						<td class="play">
							<div class="tile tile-1">
								<div class="inner"></div>
							</div>
						</td>
						<td class="about">
							<div class="tile tile-1">
								<div class="inner"></div>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			
			</div>
		</div>
	</div>
	
	<div id="menu" class="screen">
		<div class="vertical text-center">
			<h2><span class="firstleft">bin</span><span class="firstright">airo</span></h2>
			{{--<p data-action="tutorial">--}}
				{{--How to play--}}
			{{--</p>--}}
			<table data-grid="titlegrid" cellpadding="0" cellspacing="0">
					<tbody>
					<tr>
						<td>
							<div id="upb">
								<button type="button" class="btn btn-primary" data-action="play">Play</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>
							<div id="dowb">
								<button type="button" class="btn btn-success" data-action="about">About</button>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
		

		</div>
	</div>
	
	<div id="about" class="screen text" data-action="rules">
		<div class="vertical">
			<h3>About</h3>
			<div class="side-padded">
				<p>
					Binairo is a logic puzzle game<br>that uses binary numbers and is played on a various sized rectangular grids<br>
					<span id="app">The game has many different versions, names and color designs in the world and we hope you enjoy this one.</span><br>
					<br>
					It was created by<br>
					(c) 2019<br>
				</p>
			</div>
		</div>
	</div>
	
	<div id="rules" class="screen text" data-action="show-game">
		<div class="vertical">
			<h3>Rules</h3>
			<div class="side-padded">
				<p>
					Three adjacent tiles of the same color
					in a row or column isn't allowed.
				</p>
				<p>
					Rows and columns have an equal number of each color.
				</p>
				<p>
					No two rows and no two columns are the same.
				</p>
				<p>
					Every hint costs 1 (one) point.
				</p>
			</div>
		</div>
	</div>
	
	<div id="loading" class="screen">
		<div class="vertical">
			<h2>Loading</h2>
			<p></p>
			<div id="loadinggrid" class="board">
				<table data-grid="loadinggrid" cellpadding="0" cellspacing="0">
					<tbody>
					<tr>
						<td class="odd">
							<div class="tile tile-2 loading">
								<div class="inner"></div>
							</div>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<div id="game" class="screen">
		<p id="hintMsg" class="topMsg"></p>
		<p id="chooseSize" class="topMsg">Select a Size to play...</p>
		<h2 id="boardsize"></h2>
		<div id="date_time" class="text-center c">
			<span class="date">March 18 2019</span>
			<span class="timer">Timer: <b>00:00</b></span>
		</div>
		<div id="board" class="vertical board gameboard">
		</div>
		

		
		
		<div id="menugrid" class="vertical board hidden">
			<table data-grid="menugrid" cellpadding="0" cellspacing="0">
				<tbody>
				<tr>
					<td class="odd">
						<div class="">
							<div>
								<img src="{{ asset('/images/blue.png') }}" class="coloredarrow">
							</div>
						</div>
					</td>
					<td class="even">
						<div class="">
							<div>
								<img src="{{ asset('/images/orange.png') }}" class="coloredarrow">
							</div>
						</div>
					</td>
					<td class="even">
						<div class="">
							<div>
								<img src="{{ asset('/images/blue.png') }}" class="coloredarrow">
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td class="odd">
						<div class="tile tile-1">
							<div data-action="startGame" data-size="1" class="inner"></div>
						</div>
					</td>
					<td class="even">
						<div class="tile tile-1">
							<div data-action="startGame" data-size="2" class="inner"></div>
						</div>
					</td>
					<td class="even">
						<div class="tile tile-2">
							<div data-action="startGame" data-size="3" class="inner"></div>
						</div>
					</td>
				</tr>
				<tr>
					<td class="even">
						<div class="tile tile-1">
							<div data-action="startGame" data-size="4" class="inner"></div>
						</div>
					</td>
					<td class="odd">
						<div class="tile tile-1">
							<div data-action="startGame" data-size="5" class="inner"></div>
						</div>
					</td>
					<td class="even">
						<div class="tile tile-1">
							<div data-action="rules" class="inner">?</div>
						</div>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		
		<div id="score">
			<!-- <img id="trophy" src="{{ asset('/images/trophy.png') }}"> -->
			<span id="score_text">Score: </span>
			<span id="scorenr">42
			</span>
		</div>



		<div id="bar">
			<div class="iconcon" data-action="back">
				<div id="back" class="icon"></div>
			</div>
			<div class="iconcon" data-action="undo">
				<div id="undo" class="icon"></div>
			</div>
			<a class="iconcon" id="tweeturl" target="_blank" href="about:blank" data-action="tweet"><span id="tweet" class="icon"></span></a>
			<div class="iconcon" data-action="help">
				<div id="help" class="icon"></div>
			</div>
			<div class="iconcon" data-action="rules">
				<div id="rules" class="icon"></div>
			</div>
		</div>
	</div>
</div>
<div id="feelsize"></div>

<div class="calendar-show d-none">
	
	<div class="main-wrapper">
		
		<div class="sidebar-wrapper z-depth-2 side-nav fixed d-none" id="sidebar">
			
			<div class="sidebar-title">
				<h4>Events</h4>
				<h5 id="eventDayName">Date</h5>
			</div>
			<div class="sidebar-events" id="sidebarEvents">
				<div class="empty-message">Sorry, no saved games to selected date</div>
			</div>
		
		</div>
		
		<div class="content-wrapper grey lighten-3">
			<div class="container">
				
				<div class="calendar-wrapper z-depth-2">
					
					<div class="header-background">
						<div class="calendar-header">
							
							<a class="prev-button" id="prev">
								<i class="material-icons">keyboard_arrow_left</i>
							</a>
							<a class="next-button" id="next">
								<i class="material-icons">keyboard_arrow_right</i>
							</a>
							
							<div class="row header-title">
								
								<div class="header-text">
									<h3 id="month-name">February</h3>
									<h5 id="todayDayName">Today is Friday 7 Feb</h5>
								</div>
							
							</div>
						</div>
					</div>
					
					<div class="calendar-content">
						<div id="calendar-table" class="calendar-cells">
							
							<div id="table-header">
								<div class="row">
									<div class="col">Mon</div>
									<div class="col">Tue</div>
									<div class="col">Wed</div>
									<div class="col">Thu</div>
									<div class="col">Fri</div>
									<div class="col">Sat</div>
									<div class="col">Sun</div>
								</div>
							</div>
							
							<div id="table-body" class="">
							
							</div>
						
						</div>
					</div>
					
					<div class="calendar-footer d-none">
						<div class="emptyForm" id="emptyForm">
							<h4 id="emptyFormTitle">No saved game now</h4>
							<a class="addEvent" id="changeFormButton">Save</a>
						</div>
						<div class="addForm" id="addForm">
							<h4>Add new game</h4>
							
							{{--<div class="row">--}}
								{{--<div class="input-field col s6">--}}
									{{--<input id="eventTitleInput" type="text" class="validate">--}}
									{{--<label for="eventTitleInput">Title</label>--}}
								{{--</div>--}}
								{{--<div class="input-field col s6">--}}
									{{--<input id="eventDescInput" type="text" class="validate">--}}
									{{--<label for="eventDescInput">Description</label>--}}
								{{--</div>--}}
							{{--</div>--}}
							
							<div class="addEventButtons">
								<a class="waves-effect waves-light btn blue lighten-2" id="addEventButton">Save</a>
								<a class="waves-effect waves-light btn grey lighten-2" id="cancelAdd">Cancel</a>
							</div>
						
						</div>
					</div>
				
				</div>
			
			</div>
		</div>
	
	</div>
</div>

<script>
	var WebFontConfig = {
		custom: {
			families: ['titleFont', 'contentFont'],
			urls: ["{{ asset('css/app.css') }}"]
		},
		active: function () {
			//Game.start();
			app.fontsLoaded();
		}
	};
</script>

<script type="text/javascript" src="{{ asset('js/binairo.js') }}"></script>

</body>
</html>
