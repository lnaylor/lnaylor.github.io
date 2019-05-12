var target_full = "HAPPYMOTHER'SDAY!";
var target = "HAPPYMOTHER'SDAY!";
resetTarget = function() {
	target = "HAPPYMOTHER'SDAY!";
}
var message = "";
var endGame;
var temp;
var temp2;
var temp3;
var new_col_row;
var up_down = false;
var left_right = false;
var layer0;
var layer1;
var layer2;
var textSize = "15px Arial";
var interval = .75;
var counter = 0;
var gameWon=false;
var possible_directions = ['N', 'S', 'E', 'W'];
var new_direction;
var new_position;
var need_new_obs;
var numObs = 5;
var hitRow = 0;
var hitCol = 0;
const WALL = 8;
const TOKEN = 3;
const EMPTY = 1;
const NON_LETTER = 2;
const VISIBLE = 0;
const NON_VISIBLE = 1;
const TOK_COL = 1;
const TOK_ROW = 8;
const OBSTACLE = 7;

var map = {
	cols:20,
	rows:20,
	tsize:32,
	tokenCol:1,
	tokenRow:18,
	layers: [[
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8
	], [
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	], [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	], [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	], [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	],
	[
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 
	]],
	getTile: function(layer, col, row) {
		return this.layers[layer][row *map.cols + col];
	}
};

var getNumObs = function() {
	var count=0;
	for (var i =0; i<map.layers[4].length; i++) {
		if (map.layers[4][i]==OBSTACLE) {
			count++;
		}
	}
	return count;
}
var randomizeLetters = function() {
	var openSpot;
	for (var r=0;r<map.rows;r++) {
		for (var c=0;c<map.cols;c++) {
			map.layers[1][r*map.cols+c] = 2;
			map.layers[2][r*map.cols+c] = 0;
		}
	}
	for (var i=0; i<target.length; i++) {
		openSpot = false;
		while (!openSpot) {
			var j = Math.floor(Math.random() * Math.floor(map.cols-2))+1;
			var k = Math.floor(Math.random() * Math.floor(map.rows-2))+1;
			if (map.getTile(0, k, j) != 3 && map.getTile(1, k, j) ==2) {
				map.layers[1][k*map.cols+j] = target.charAt(i);
				map.layers[2][k*map.cols+j] = 0;
				openSpot = true;
			}
		}
	}
}
var Keyboard = {};

Keyboard.LEFT = 37;
Keyboard.RIGHT = 39;
Keyboard.UP = 38;
Keyboard.DOWN = 40;

Keyboard._keys = {};

Keyboard.listenForEvents = function(keys) {
	window.addEventListener('keydown', this._onKeyDown.bind(this));
	window.addEventListener('keyup', this._onKeyUp.bind(this));

	keys.forEach(function(key) {
		this._keys[key] = false;
	}.bind(this));
}

Keyboard._onKeyDown = function (event) {
	var keyCode = event.keyCode;
	if (keyCode in this._keys) {
		event.preventDefault();
		this._keys[keyCode] = true;
	}
};

Keyboard._onKeyUp = function (event) {
	var keyCode = event.keyCode;
	if (keyCode in this._keys) {
		event.preventDefault();
		this._keys[keyCode] = false;
	}
};

Keyboard.isDown = function (keyCode) {
	if (!keyCode in this._keys) {
		throw new Error('Keycode ' + keyCode + ' is not being listened to');
	}
	return this._keys[keyCode];
};

var Game = {};

Game.run = function(context, msg_ctx) {
	this.ctx = context;
	this.msg_ctx = msg_ctx;
	this._previousElapsed=0;
	randomizeLetters();

	var p = this.load();
		this.init();
		window.requestAnimationFrame(this.tick);
};

Game.tick = function(elapsed) {
	window.requestAnimationFrame(this.tick);

	var canvas = document.getElementById('screen');
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);

	var delta = (elapsed - this._previousElapsed)/ 1000.0;
	//delta = Math.min(delta, 0.25);
	this._previousElapsed = elapsed;

	this.update(delta);
	this.render();
}.bind(Game);

Game.reset = function() {
	resetTarget();
	this.msg_ctx.fillStyle="white";
	this.msg_ctx.fillRect(0,0,640, 80);
	message = "";
	for (var c=0; c< map.cols; c++) {
		for (var r=0; r<map.rows; r++) {
			map.layers[2][r*map.cols+c]=0;	
		}
	}
	map.layers[0][map.tokenRow*map.cols+map.tokenCol]=1;
	map.tokenCol=1;
	map.tokenRow=18;
	map.layers[0][map.tokenRow*map.cols+map.tokenCol]=3;
	randomizeLetters();

};

Game.update = function(delta) {
	if (Keyboard.isDown(Keyboard.LEFT)) {
		hitRow = 0;
		hitCol = 0;
		new_col_row = Math.max(0, map.tokenCol-1);
		left_right = true;
		Keyboard._keys[Keyboard.LEFT] = false;
	}
	if (Keyboard.isDown(Keyboard.RIGHT)) {
		hitRow = 0;
		hitCol = 0;
		new_col_row = Math.min(map.cols-1, map.tokenCol+1);
		left_right = true;
		Keyboard._keys[Keyboard.RIGHT] = false;
	}
	if (Keyboard.isDown(Keyboard.UP)) {
		hitRow = 0;
		hitCol = 0;
		new_col_row = Math.max(0, map.tokenRow-1);
		up_down = true;
		Keyboard._keys[Keyboard.UP] = false;
	}
	if(Keyboard.isDown(Keyboard.DOWN)) {
		hitRow = 0;
		hitCol = 0;
		new_col_row = Math.min(map.rows-1, map.tokenRow+1);
		up_down = true;
		Keyboard._keys[Keyboard.DOWN] = false;
	}
	if (left_right) {
		layer0 = map.layers[0][map.tokenRow*map.cols + new_col_row];
		layer1 = map.layers[1][map.tokenRow*map.cols + new_col_row];
		layer2 = map.layers[2][map.tokenRow*map.cols + new_col_row];
	}
	else if (up_down) {
		layer0 = map.layers[0][new_col_row*map.cols + map.tokenCol];
		layer1 = map.layers[1][new_col_row*map.cols + map.tokenCol];
		layer2 = map.layers[2][new_col_row*map.cols + map.tokenCol];
	}
	if (left_right || up_down) {
		map.layers[0][map.tokenRow*map.cols + map.tokenCol]=EMPTY;

		if (layer1!=NON_LETTER &&layer1!=target.charAt(0)&&layer2!=NON_VISIBLE) { 
			Game.reset(); 
			endGame=true;
		}
		else if (layer0!=8 && ((layer1!=2&&layer2==1) ||(layer1==2 || layer1==target.charAt(0)))) {
			if (left_right) {
				map.tokenCol = new_col_row;
			}
			else if (up_down) {
				map.tokenRow = new_col_row;
			}
			if (layer1== target.charAt(0) && layer2!=NON_VISIBLE) {
				message += target.charAt(0);
				target = target.substr(1);
				map.layers[2][map.tokenRow*map.cols+map.tokenCol]=NON_VISIBLE;
			}
		}
		if(!endGame) {
			map.layers[0][map.tokenRow*map.cols + map.tokenCol]=TOKEN;
		}

	}
	if(map.layers[4][map.tokenRow*map.cols + map.tokenCol]==OBSTACLE) {
		//Game.reset();
		//endGame=true;
		if (map.tokenRow!=hitRow && map.tokenCol!=hitCol) {
			randomizeLetters();
			hitRow = map.tokenRow;
			hitCol = map.hitCol;
		}
	}
	if (counter > interval&&!gameWon) {
		for (var c=0; c<map.cols; c++) {
			for (var r=0; r<map.rows; r++) {
				var tile = map.getTile(4, c, r);
				if(tile==OBSTACLE && map.layers[3][r*map.cols+c]!=1) {
				//	if (c<map.cols-2) {
						map.layers[4][r*map.cols+c]=EMPTY;
						need_new_obs = false;
						if (map.layers[5][r*map.cols+c] == 'N') {
							if(map.layers[0][(r-1)*map.cols+c] != WALL) {
								map.layers[4][(r-1)*map.cols+c] = OBSTACLE;
								map.layers[3][(r-1)*map.cols+c] = 1;
								map.layers[5][(r-1)*map.cols+c] = 'N';
							}
							else {
								need_new_obs = true;
							}
						}
						if (map.layers[5][r*map.cols+c] == 'S') {
							if (map.layers[0][(r+1)*map.cols+c] != WALL) {
								map.layers[4][(r+1)*map.cols+c] = OBSTACLE;
								map.layers[3][(r+1)*map.cols+c] = 1;
								map.layers[5][(r+1)*map.cols+c] = 'S';
							}
							else {
								need_new_obs = true;
							}
						}
						if (map.layers[5][r*map.cols+c] == 'E') {
							if (map.layers[0][r*map.cols+(c+1)] != WALL) {
								map.layers[4][r*map.cols+(c+1)] = OBSTACLE;
								map.layers[3][r*map.cols+(c+1)] = 1;
								map.layers[5][r*map.cols+(c+1)] = 'E';
							}
							else {
								need_new_obs = true;
							}
						}
						if (map.layers[5][r*map.cols+c] == 'W') {
							if (map.layers[0][r*map.cols+(c-1)] != WALL) {
								map.layers[4][r*map.cols+(c-1)] = OBSTACLE;
								map.layers[3][r*map.cols+(c-1)] = 1;
								map.layers[5][r*map.cols+(c-1)] = 'W';
							}
							else {
								need_new_obs = true;
							}
						}
						if (map.layers[5][r*map.cols+c]==0 || need_new_obs) {
							new_direction = possible_directions[Math.floor(Math.random()*possible_directions.length)];
							new_position = Math.floor(Math.random()*map.cols-2)+1;
							if (new_direction =='N') {
								map.layers[4][(map.rows-2)*map.cols+new_position] = OBSTACLE;
								map.layers[5][(map.rows-2)*map.cols+new_position] = 'N';
								map.layers[3][(map.rows-2)*map.cols+new_position] = 1;
							}
							if (new_direction =='S') {
								map.layers[4][1*map.cols+new_position] = OBSTACLE;
								map.layers[5][1*map.cols+new_position] = 'S';
								map.layers[3][1*map.cols+new_position] = 1;
							}
							if (new_direction =='E') {
								map.layers[4][new_position*map.cols+1] = OBSTACLE;
								map.layers[5][new_position*map.cols+1] = 'E';
								map.layers[3][new_position*map.cols+1] = 1;
							}
							if (new_direction =='W') {
								map.layers[4][1*map.cols+(map.cols-2)] = OBSTACLE;
								map.layers[5][1*map.cols+(map.cols-2)] = 'W';
								map.layers[3][1*map.cols+(map.cols-2)] = 1;
							}

						}
						map.layers[5][r*map.cols+c] = 0;
						
				//	}
				//	else if (c==map.cols-2) {
				//		map.layers[4][r*map.cols+c]=EMPTY;
				//		map.layers[4][r*map.cols+1] = OBSTACLE;
				//		map.layers[3][r*map.cols+1] = 1;
				//	}
				}
			}
		}
		for (var i =0; i< numObs-getNumObs(); i++) {
			new_direction = possible_directions[Math.floor(Math.random()*possible_directions.length)];
			new_position = Math.floor(Math.random()*map.cols-2)+1;
			if (new_direction =='N') {
				map.layers[4][(map.rows-2)*map.cols+new_position] = OBSTACLE;
				map.layers[5][(map.rows-2)*map.cols+new_position] = 'N';
			}
			if (new_direction =='S') {
				map.layers[4][1*map.cols+new_position] = OBSTACLE;
				map.layers[5][1*map.cols+new_position] = 'S';
			}
			if (new_direction =='E') {
				map.layers[4][new_position*map.cols+1] = OBSTACLE;
				map.layers[5][new_position*map.cols+1] = 'E';
			}
			if (new_direction =='W') {
				map.layers[4][1*map.cols+(map.cols-2)] = OBSTACLE;
				map.layers[5][1*map.cols+(map.cols-2)] = 'W';
			}

		}
		counter=0;
	}
	counter+=delta;
	Game.render();
	endGame=false;
	left_right = false;
	up_down = false;
};

Game._drawLayer = function(layer) {
	for (var c=0; c< map.cols; c++) {
		for (var r=0; r<map.rows; r++) {
			var tile = map.getTile(layer,c, r);
			if (layer==0) {
				if (tile==8) {
					this.ctx.fillStyle="black";
					this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);
				}
				else if(tile==1) {
				this.ctx.fillStyle="red";
				this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);}
				else if(tile==3) {
					this.ctx.fillStyle="purple";
					this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);}
			}
			else if (layer==3) {
				map.layers[3][r*map.cols+c]=0;
			}
			else if(layer==4) {
				if (tile==7) {
					this.ctx.fillStyle="black";
					this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);
				}

			}
			
			else {
				if (typeof tile == "string"){
				
				this.ctx.fillStyle="white";
				this.ctx.font = textSize;
				if (map.layers[2][r*map.cols+c]==0) {
					this.ctx.fillText(tile, (c*map.tsize)+(map.tsize/3), (r*map.tsize+map.tsize)-(map.tsize/3));}
				}
			}
		}
	}
};


Game.render = function() {
	this._drawLayer(0);
	this._drawLayer(1);
	this._drawLayer(3);
	this._drawLayer(4);
	this.msg_ctx.font="30px Arial";
	this.msg_ctx.fillStyle="purple";
	if (message.valueOf()=="HAPPY") {message+=" ";}
	if (message.valueOf()=="HAPPY MOTHER'S") {message+=" ";}
	if (message.valueOf()=="HAPPY MOTHER'S DAY!") {
		gameWon=true;
	}
	this.msg_ctx.fillText(message, 5, 50);
};

Game.load = function() {};
Game.init = function() {
	Keyboard.listenForEvents([Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);

};

window.onload = function() {
	var context = document.getElementById('screen').getContext('2d');
	var msg_ctx = document.getElementById('message').getContext('2d');
	Game.run(context, msg_ctx);


};
