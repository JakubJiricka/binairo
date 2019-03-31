@extends('layouts.app')

@section('content')
<div class="container">
    <div id="container">
        <div id="title" class="screen show01 hide0 hide1 hidehs" data-action="close-titleScreen">
            <div class="vertical">
                <h1 style="font-family: 'Niagara Engraved Regular'; src: local('Niagara Solid Regular'), url('NIAGSOL.woff') format('woff');">
                    <span style="color:#F7B633">bin</span><span style="color:#1F3C88">ario</span>
                </h1>
                <div id="titlegrid" class="board">
                    <div id="digits">
                        <span id="zero">0</span><span id="one">1</span>
                    </div>
                    <table data-grid="titlegrid" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr>
                            <td class="odd">
                                <div class="tile tile-2">
                                    <div class="inner"></div>
                                </div>
                            </td>
                            <td class="even">
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
            <div class="vertical">
                <h2><span style="color:#60b0f4">bin</span><span style="color:#f4a460">airo</span></h2>
                <p data-action="tutorial">
                    How to play
                </p>
                <p data-action="play">
                    Play
                </p>
                <p data-action="about">
                    About
                </p>
            </div>
        </div>
        
        <div id="about" class="screen text" data-action="rules">
            <div class="vertical">
                <h3>About</h3>
                <div class="side-padded">
                    <p>
                        binairo is a logic puzzle game<br>based on puzzle concepts<br>Binairo.
                        <span id="app_guide">If you like, you can also get the free binairo app soon.</span><br>
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
            <p id="chooseSize" class="topMsg">Select a size to play...</p>
            <h2 id="boardsize"></h2>
            <div id="board" class="vertical board"></div>
            
            
            <div id="menugrid" class="vertical board hidden">
                <table data-grid="menugrid" cellpadding="0" cellspacing="0">
                    <tbody>
                    <tr>
                        <td class="odd">
                            <div class="tile tile-2">
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
                            <div class="tile tile-2">
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
                <img id="trophy" src="{{ asset('/images/trophy.png') }}"><span id="scorenr">42</span>
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
</div>
@endsection
