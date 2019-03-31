const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sass('resources/sass/app.scss', 'public/css')
	.sass('resources/sass/auth.scss', 'public/css')
	.copyDirectory('resources/binairo/img', 'public/images')
	.js('resources/js/app.js', 'public/js');

mix.scripts([
	'resources/binairo/js/index.js',
	'resources/binairo/js/jquery.min.js',
	'resources/binairo/js/utils.js',
	'resources/binairo/js/state.js',
	'resources/binairo/js/game.js',
	'resources/binairo/js/grid.js',
	'resources/binairo/js/tile.js',
	'resources/binairo/js/hint.js',
	'resources/binairo/js/tutorial.js',
	'resources/binairo/js/webfont.js',
	'resources/binairo/js/levels.js',
	'resources/binairo/js/backgroundservice.js',
	'resources/binairo/js/calendar/popper.min.js',
	'resources/binairo/js/calendar/bootstrap.min.js',
	'resources/binairo/js/calendar/materialize.min.js',
	'resources/binairo/js/calendar.js',
], 'public/js/binairo.js');
