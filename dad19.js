var target = "HAPPYBIRTHDAYDAD!";
var message = "";
var endGame;
var temp;
var temp2;
var temp3;
var map = {
	cols:10,
	rows:10,
	tsize:64,
	tokenCol:1,
	tokenRow:8,
	layers: [[
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 1, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 3, 1, 1, 1, 1, 1, 1, 1, 8,
	8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
	], [
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
	2, 2, 'Y', 2, 2, 'T', 2, 'H', 2, 2,
	2, 2, 2, 2, 2, 2, 2, 'A', 2, 2,
	2, 2, 2, 2, 'P', 2, 'D', 2, 2, 2,
	2, 2, 'D', 2, 2, 2, 2, 2, 'B', 2,
	2, 'I', 2, '!', 2, 2, 2, 2, 2, 2,
	2, 2, 2, 2, 2, 'D', 2, 'H', 2, 2,
	2, 'Y', 'A', 2, 2, 2, 2, 2, 'A', 2,
	2, 2, 2, 2, 2, 'R', 2, 'P', 2, 2,
	2, 2, 2, 2, 2, 2, 2, 2, 2, 2
	], [
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	]],
	getTile: function(layer, col, row) {
		return this.layers[layer][row *map.cols + col];
	}
};

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

	var p = this.load();
		this.init();
		window.requestAnimationFrame(this.tick);
};

Game.tick = function(elapsed) {
	window.requestAnimationFrame(this.tick);

	this.ctx.clearRect(0, 0, 512, 512);

	var delta = (elapsed - this._previousElapsed)/ 1000.0;
	delta = Math.min(delta, 0.25);
	this._previousElapsed = elapsed;

	this.update(delta);
	this.render();
}.bind(Game);

Game.reset = function() {
	target = "HAPPYBIRTHDAYDAD!";
	this.msg_ctx.fillStyle="white";
	this.msg_ctx.fillRect(0,0,640, 80);
//	this.msg_ctx.font="30px Arial";
//	this.msg_ctx.fillText(message, 5, 50);
	message = "";
	for (var c=0; c< map.cols; c++) {
		for (var r=0; r<map.rows; r++) {
			map.layers[2][r*map.cols+c]=0;	
		}
	}
	map.layers[0][map.tokenRow*map.cols+map.tokenCol]=1;
	map.tokenCol=1;
	map.tokenRow=8;
	map.layers[0][map.tokenRow*map.cols+map.tokenCol]=3;

};

Game.update = function(delta) {
	if (Keyboard.isDown(Keyboard.LEFT)) {
	map.layers[0][map.tokenRow*map.cols + map.tokenCol]=1;
		temp = Math.max(0, map.tokenCol-1);
		temp2 = map.layers[0][map.tokenRow*map.cols + temp]
		temp3 = map.layers[1][map.tokenRow*map.cols + temp]
		temp4 = map.layers[2][map.tokenRow*map.cols + temp]
		if (temp3!=2 &&temp3!=target.charAt(0)&&temp4!=1) {
			Game.reset();
			endGame=true;
		}
		else if (temp2 !=8 && ((temp3!=2&&temp4==1) ||(temp3==2 || temp3==target.charAt(0)))) {
			map.tokenCol = temp;
			if (temp3 == target.charAt(0)) {
				message += target.charAt(0);
				target = target.substr(1);
				map.layers[2][map.tokenRow*map.cols+map.tokenCol]=1;
			}
		}
		Keyboard._keys[Keyboard.LEFT] = false;}
	if (Keyboard.isDown(Keyboard.RIGHT)) {
	map.layers[0][map.tokenRow*map.cols + map.tokenCol]=1;
		temp= Math.min(map.cols-1, map.tokenCol+1);
		temp2 = map.layers[0][map.tokenRow*map.cols + temp]
		temp3 = map.layers[1][map.tokenRow*map.cols + temp]
		temp4 = map.layers[2][map.tokenRow*map.cols + temp]
		if (temp3!=2 &&temp3!=target.charAt(0)&&temp4!=1) {
			Game.reset();
			endGame=true;
		}
		else if (temp2 !=8 && ((temp3!=2&&temp4==1) ||(temp3==2 || temp3==target.charAt(0)))) {
			map.tokenCol = temp;
			if (temp3==target.charAt(0)) {
				message += target.charAt(0);
				target = target.substr(1);
				map.layers[2][map.tokenRow*map.cols+map.tokenCol]=1;
			}
		}
		Keyboard._keys[Keyboard.RIGHT] = false;}
	if (Keyboard.isDown(Keyboard.UP)) {
	map.layers[0][map.tokenRow*map.cols + map.tokenCol]=1;
		temp = Math.max(0, map.tokenRow-1);
		temp2 = map.layers[0][temp*map.cols + map.tokenCol]
		temp3 = map.layers[1][temp*map.cols + map.tokenCol]
		temp4 = map.layers[2][temp*map.cols + map.tokenCol]

		if (temp3!=2 &&temp3!=target.charAt(0)&&temp4!=1) {
			Game.reset();
			console.log(message);
			endGame=true;
		}
		else if (temp2 !=8 && ((temp3!=2&&temp4==1) ||(temp3==2 || temp3==target.charAt(0)))) {
			map.tokenRow = temp;
			if (temp3 ==target.charAt(0)) {
				message += target.charAt(0);
				target = target.substr(1);
				map.layers[2][map.tokenRow*map.cols+map.tokenCol]=1;
			}
		}
		Keyboard._keys[Keyboard.UP] = false;}
	if(Keyboard.isDown(Keyboard.DOWN)) {
	map.layers[0][map.tokenRow*map.cols + map.tokenCol]=1;
		temp= Math.min(map.rows-1, map.tokenRow+1);
		temp2 = map.layers[0][temp*map.cols + map.tokenCol]
		temp3 = map.layers[1][temp*map.cols + map.tokenCol]
		temp4 = map.layers[2][temp*map.cols + map.tokenCol]
		if (temp3!=2 &&temp3!=target.charAt(0)&&temp4!=1) {
			Game.reset();
			endGame=true;
		}
		else if (temp2 !=8 && ((temp3!=2&&temp4==1) ||(temp3==2 || temp3==target.charAt(0)))) {
			map.tokenRow = temp;
			if (temp3 ==target.charAt(0)) {
				message += target.charAt(0);
				target = target.substr(1);
				map.layers[2][map.tokenRow*map.cols+map.tokenCol]=1;
			}
		}
		Keyboard._keys[Keyboard.DOWN] = false;}
	if(!endGame) {
	map.layers[0][map.tokenRow*map.cols + map.tokenCol]=3;
	}
	Game.render();
	endGame=false;
};

Game._drawLayer = function(layer) {
	for (var c=0; c< map.cols; c++) {
		for (var r=0; r<map.rows; r++) {
			var tile = map.getTile(layer,c, r);
			if (layer==0) {
				if (tile==8) {
					this.ctx.fillStyle="black";
					this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);}
				else if(tile==1) {
				this.ctx.fillStyle="red";
				this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);}
				else if(tile==3) {
					this.ctx.fillStyle="purple";
					this.ctx.fillRect(c*map.tsize, r*map.tsize, map.tsize, map.tsize);}
			}
					
			
			else {
				if (typeof tile == "string"){
				
				this.ctx.fillStyle="white";
				this.ctx.font = "30px Arial";
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
	this.msg_ctx.font="30px Arial";
	this.msg_ctx.fillStyle="purple";
	if (message.valueOf()=="HAPPY") {message+=" ";}
	if (message.valueOf()=="HAPPY BIRTHDAY") {message+=" ";}
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
