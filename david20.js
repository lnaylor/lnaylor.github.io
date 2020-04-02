var messageOrder = "HAPPYBIRTHDAYDAVID";
var count=0;
var message="HAPPYBIRTHDAYDAVIDHAPPYBIRTHDAYDAVID";
var context = document.getElementById('screen').getContext('2d');
var msg_ctx = document.getElementById('message').getContext('2d');
var currentTile=null;
var currentLetter="Q";
var blocked=false;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const wipe = async (tiles) => {
	blocked=true;
  	await sleep(1000)

				for (var j = 0; j<tiles.length;j++) {
					if (!tiles[j].isPermanent) {
						tiles[j].isFaceUp=false;
						tiles[j].draw();
					}
				}
				//msg_ctx.fillStyle="white";
				//msg_ctx.fillRect(0,0,640, 80);
	blocked=false;
}

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

var Tile = function(x, y, letter) {
	this.x = x;
	this.y = y;
	this.width=50;
	this.isFaceUp=false;
	this.isPermanent=false;
	this.letter=letter;
};
Tile.prototype.draw = function() {
	if (!this.isFaceUp) {
		context.fillStyle="blue";
		context.fillRect(this.x, this.y, this.width, this.width);
	}
	else {
		context.fillStyle="white";
		context.fillRect(this.x, this.y, this.width, this.width);
		context.font="35px Arial";
		context.fillStyle="blue";
		context.fillText(this.letter, this.x, this.y+this.width);
	}
};
var Game = {};

Game.run = function(context, msg_ctx) {
	this.ctx = context;
	this.msg_ctx = msg_ctx;

	this.init();
};

Game.init = function() {
	message=message.shuffle();
	this.drawBoard();

};

Game.drawBoard = function() {
	var tiles = [];
	for (var i =0; i<6; i++) {
		for (var j=0; j<6; j++) {
			tiles.push(new Tile(i*55, j*55, message.charAt((i*6)+j)));
		}
	}
	
	for (var i = 0; i<tiles.length;i++) {
		tiles[i].draw();
	}
	document.querySelector('#screen').onclick = function(event) {
	if (!blocked) {
			for (var i = 0; i<tiles.length;i++) {
		if (event.clientX > tiles[i].x && event.clientX < tiles[i].x+tiles[i].width && event.clientY > tiles[i].y && event.clientY < tiles[i].y+tiles[i].width) {
			tiles[i].isFaceUp=true;
			tiles[i].draw();
			if ((currentTile==null || ((currentTile.letter).charAt(0)).localeCompare(tiles[i].letter)==0)&&(messageOrder.charAt(count)).localeCompare(tiles[i].letter)==0) {
				if (currentTile==null) {
					currentTile=tiles[i];
				}
				else {
					tiles[i].isPermanent=true;
					currentTile.isPermanent=true;
					count++;
					currentTile=null;
				}
			}
			else {
				currentTile=null;
				wipe(tiles);
				
			}
		}
	}
	
	if (count>0) {
		msg_ctx.fillStyle="blue";
		msg_ctx.font="35px Arial";
		msg_ctx.fillText(messageOrder.substring(0, count), 5, 50);
	}
	}

	
}
	
}



window.onload = function() {
	var context = document.getElementById('screen').getContext('2d');
	var msg_ctx = document.getElementById('message').getContext('2d');
	Game.run(context, msg_ctx);


};