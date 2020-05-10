var messageOrder = "HAPPYMOTHER'SDAY";
var count=0;
var saved=0;
var message="HAPPYMOTHER'SDAY";
var context = document.getElementById('screen').getContext('2d');
var msg_ctx = document.getElementById('message').getContext('2d');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const wipe = async (tiles, i) => {
  	await sleep(1000)
 	count=saved;
	var c = (tiles[i].col)-1 ==-1 ? 3 : (tiles[i].col)-1;
	var foundTile=false;
	var k=0;
	while (!foundTile) {
		
		if (tiles[k].row==tiles[i].row && tiles[k].col==c) {
			if (tiles[k].isPermanent) {
				c= c-1==-1 ? 3 : c-1;
				k=0;
			}
			else {
				var temp = tiles[i].x;
				tiles[i].x = tiles[k].x;
				tiles[k].x=temp;
			
				tiles[k].col=tiles[i].col;
				tiles[i].col=c;
				foundTile=true;
			}
			
		}
		else {
			k++;
		}
		
	}
				for (var j = 0; j<tiles.length;j++) {
					if (!tiles[j].isPermanent) {
						tiles[j].isFaceUp=false;
					tiles[j].draw();
					}
					
				}
				msg_ctx.fillStyle="white";
				msg_ctx.fillRect(0,0,640, 80);
				msg_ctx.fillStyle="blue";
				msg_ctx.font="35px Arial";
				msg_ctx.fillText(messageOrder.substring(0, saved), 5, 50);
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

var Tile = function(x, y, col, row, letter) {
	this.x = x;
	this.y = y;
	this.width=50;
	this.isFaceUp=false;
	this.isPermanent=false;
	this.letter=letter;
	this.col=col;
	this.row=row;
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
	for (var i =0; i<4; i++) {
		for (var j=0; j<4; j++) {
			tiles.push(new Tile(i*55, j*55, i, j, message.charAt((i*4)+j)));
		}
	}
	
	for (var i = 0; i<tiles.length;i++) {
		tiles[i].draw();
	}
	document.querySelector('#screen').onclick = function(event) {
	for (var i = 0; i<tiles.length;i++) {
		if (!tiles[i].isPermanent && !tiles[i].isFaceUp) {
		if (event.clientX > tiles[i].x && event.clientX < tiles[i].x+tiles[i].width && event.clientY > tiles[i].y && event.clientY < tiles[i].y+tiles[i].width) {
			tiles[i].isFaceUp=true;
			tiles[i].draw();
			if ((messageOrder.charAt(count)).localeCompare(tiles[i].letter)==0) {
				count++;
				if (count%4==0) {
					saved=count;
					for (var k = 0; k<tiles.length; k++) {
						if (tiles[k].isFaceUp) {
							tiles[k].isPermanent=true;
						}
					}
				}
			}
			else {
				wipe(tiles, i);
				
			}
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



window.onload = function() {
	var context = document.getElementById('screen').getContext('2d');
	var msg_ctx = document.getElementById('message').getContext('2d');
	Game.run(context, msg_ctx);


};
