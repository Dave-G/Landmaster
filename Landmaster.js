/* Created by David Gedarovich
 * http://www.github.com/Dave-G
 * gedarovich@hotmail.com
 * Updated: 2/2/12
 */

// Variables and Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var FPS = 30;
var stats = 0;
var frames = 0;
var gravity = 7;
var canJump = 0;
var cooldown = 0;
var hitCooldown = 0;
var currentWorld = 0;
var gameOver = 0;
var victory = 0;
var kills = 0;
var deaths = 0;
var keysDown = {};
canvas.width = 400;
canvas.height = 400;
document.body.appendChild(canvas);

// Key Listeners
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Player
var player = {
	color: "blue",
	mspeed: 4,
	jspeed: -1,
	health: 3,
	maxHealth: 3,
	level: 1,
	exp: 0,
	goingRight: 1,
	x: 20,
	y: 385,
	width: 20,
	height: 20,
	draw: function(){
		// Draw the player itself
		ctx.fillStyle = this.color;
		// Flash if the player has been hit
		if (hitCooldown/2 != Math.round(hitCooldown/2)){
			ctx.fillStyle = "white";}
		ctx.fillRect(this.x - this.width / 2, 
			this.y - this.height / 2,
			this.width, this.height);
		// Show which direction the player is facing
		if (this.goingRight == 1){
			ctx.fillRect(this.x + this.width - 7, this.y - 3, 5, 5);}
		if (this.goingRight == 0){
			ctx.fillRect(this.x - this.width + 2, this.y - 3, 5, 5);}
		// Draw health bars at the top
		if (this.health > this.maxHealth){
			this.health = this.maxHealth;}
		ctx.fillStyle = "black";
		ctx.fillRect(3, 3, 14, 14);
		ctx.fillRect(15, 3, 14, 14);
		ctx.fillRect(27, 3, 14, 14);
		if (this.maxHealth >= 4){
			ctx.fillRect(39, 3, 14, 14);}
		if (this.maxHealth >= 5){
			ctx.fillRect(51, 3, 14, 14);}
		// Second row of black bars
		if (this.maxHealth >= 6){
			ctx.fillRect(3, 17, 14, 14);}
		if (this.maxHealth >= 7){
			ctx.fillRect(15, 17, 14, 14);}
		if (this.maxHealth >= 8){
			ctx.fillRect(27, 17, 14, 14);}
		if (this.maxHealth >= 9){
			ctx.fillRect(39, 17, 14, 14);}
		if (this.maxHealth >= 10){
			ctx.fillRect(51, 17, 14, 14);}
		// First 10 health in green
		if (this.health >= 1){
			ctx.fillStyle = "green";
			ctx.fillRect(5, 5, 10, 10);}
		if (this.health >= 2){
			ctx.fillRect(17, 5, 10, 10);}
		if (this.health >= 3){
			ctx.fillRect(29, 5, 10, 10);}
		if (this.health >= 4){
			ctx.fillRect(41, 5, 10, 10);}
		if (this.health >= 5){
			ctx.fillRect(53, 5, 10, 10);}
		if (this.health >= 6){
			ctx.fillRect(5, 19, 10, 10);}
		if (this.health >= 7){
			ctx.fillRect(17, 19, 10, 10);}
		if (this.health >= 8){
			ctx.fillRect(29, 19, 10, 10);}
		if (this.health >= 9){
			ctx.fillRect(41, 19, 10, 10);}
		if (this.health >= 10){
			ctx.fillRect(53, 19, 10, 10);}
		// Health 11-20 health in yellow
		if (this.health >= 11){
			ctx.fillStyle = "yellow";
			ctx.fillRect(5, 5, 10, 10);}
		if (this.health >= 12){
			ctx.fillRect(17, 5, 10, 10);}
		if (this.health >= 13){
			ctx.fillRect(29, 5, 10, 10);}
		if (this.health >= 14){
			ctx.fillRect(41, 5, 10, 10);}
		if (this.health >= 15){
			ctx.fillRect(53, 5, 10, 10);}
		if (this.health >= 16){
			ctx.fillRect(5, 19, 10, 10);}
		if (this.health >= 17){
			ctx.fillRect(17, 19, 10, 10);}
		if (this.health >= 18){
			ctx.fillRect(29, 19, 10, 10);}
		if (this.health >= 19){
			ctx.fillRect(41, 19, 10, 10);}
		if (this.health >= 20){
			ctx.fillRect(53, 19, 10, 10);}
		// Health 21-30 health in orange
		if (this.health >= 21){
			ctx.fillStyle = "orange";
			ctx.fillRect(5, 5, 10, 10);}
		if (this.health >= 22){
			ctx.fillRect(17, 5, 10, 10);}
		if (this.health >= 23){
			ctx.fillRect(29, 5, 10, 10);}
		if (this.health >= 24){
			ctx.fillRect(41, 5, 10, 10);}
		if (this.health >= 25){
			ctx.fillRect(53, 5, 10, 10);}
		if (this.health >= 26){
			ctx.fillRect(5, 19, 10, 10);}
		if (this.health >= 27){
			ctx.fillRect(17, 19, 10, 10);}
		if (this.health >= 28){
			ctx.fillRect(29, 19, 10, 10);}
		if (this.health >= 29){
			ctx.fillRect(41, 19, 10, 10);}
		if (this.health >= 30){
			ctx.fillRect(53, 19, 10, 10);}
		// Health 31-40 health in red
		if (this.health >= 31){
			ctx.fillStyle = "red";
			ctx.fillRect(5, 5, 10, 10);}
		if (this.health >= 32){
			ctx.fillRect(17, 5, 10, 10);}
		if (this.health >= 33){
			ctx.fillRect(29, 5, 10, 10);}
		if (this.health >= 34){
			ctx.fillRect(41, 5, 10, 10);}
		if (this.health >= 35){
			ctx.fillRect(53, 5, 10, 10);}
		if (this.health >= 36){
			ctx.fillRect(5, 19, 10, 10);}
		if (this.health >= 37){
			ctx.fillRect(17, 19, 10, 10);}
		if (this.health >= 38){
			ctx.fillRect(29, 19, 10, 10);}
		if (this.health >= 39){
			ctx.fillRect(41, 19, 10, 10);}
		if (this.health >= 40){
			ctx.fillRect(53, 19, 10, 10);}
		// Draw Health/Max Health in text next to the bars
		ctx.fillStyle = "black";
		ctx.font = "8pt Arial";
		ctx.fillText("(" + this.health + "/" + this.maxHealth +")", 65, 20);
		// Draw Level and Exp at the top
		ctx.font = "10pt Arial";
		ctx.fillText("Level: " + this.level, 260, 15);
		ctx.fillText("Exp: " + this.exp + "/" + this.level*this.level*100, 260, 30);
		// Draw current location at the top
		if (currentWorld == 5){
		ctx.fillText("Location: Apathyville", 115, 15);}
		else if (currentWorld <= -1){
		ctx.fillText("Location: Magic Realm", 115, 15);}
		else {
		ctx.fillText("Location: Wilderness " + currentWorld, 115, 15);}
	},
	physics: function(){
		if (canJump == 1){
			this.jspeed = 0;}
		if (this.jspeed <= 0 && canJump == 0){
			if (this.jspeed > -13){
				this.jspeed--;}
			this.y -= this.jspeed;}
		if (this.jspeed >= 1){
			this.y -= this.jspeed;
			this.jspeed--;}
	}
};

// Skills the player can unlock and use
var skills = {
	spikeUnlocked: 0,
	spikeUses: 0,
	spikeCooldown: 0,
	spikeX: -300,
	spikeY: -100,
	draw: function(){
		if (this.spikeCooldown > 0){
			ctx.fillStyle = "blue";
			ctx.fillRect(this.spikeX - 2 / 2,
			this.spikeY - 40 / 2,
			2, 40);
			}
		else{
			this.spikeX = -300;
			this.spikeY = -100;}
	}		
};
	

// Marker for displaying floating text
var marker = {
	color: "black",
	speed: 2,
	timeLeft: 0,
	x: -100,
	y: -100,
	draw: function(){
		if (this.timeLeft != 0){
		ctx.fillStyle = this.color;
		ctx.font = "15pt Arial";
		ctx.fillText("Level Up! HP+1!", this.x, this.y);}
	},
	move: function(){
		if (this.timeLeft > 0){
			this.y -= this.speed;
			this.timeLeft--;}
	}
};

// Marker for displaying  more floating text
var marker2 = {
	color: "black",
	speed: 2,
	timeLeft: 0,
	x: -100,
	y: -100,
	draw: function(){
		if (this.timeLeft != 0){
		ctx.fillStyle = this.color;
		ctx.font = "15pt Arial";
		ctx.fillText("Spike Unlocked!", this.x, this.y);}
	},
	move: function(){
		if (this.timeLeft > 0){
			this.y -= this.speed;
			this.timeLeft--;}
	}
};

// Portal for changing zones
var portal = {
	color: "teal",
	alive: 0,
	x: -100,
	y: -100,
	height: 40,
	width: 40,
	draw: function(){
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
		ctx.fillStyle = "black";
		ctx.font = "10pt Arial";
		ctx.fillText("Magic Portal", this.x - this.width + 5, this.y - this.height + 5);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	hit: function(){
		// Teleport from Apathyville to Magic Realm 0
		if (currentWorld == 5){
			currentWorld = -1;
			player.x = 30;
			laser.x = -100;
			laser.y = -200;
			enemy.alive = 1;
			enemy.x = 200;
			enemy.y = 230;
			enemy2.alive = 1;
			enemy2.x = 240;
			enemy2.y = 180;
			enemyChaser.alive = 1;
			enemyChaser.x = 200;
			enemyChaser.y = 390;
			npc.alive = 0;
			npcHealer.alive = 0;
			portal.alive = 1;
			portal.x = 250;
			portal.y = 80;
			platform.x = 250;
			platform.y = 100;
			platform2.x = 30;
			platform2.y = 320;
			platformLong.x = 180;
			platformLong.y = 240;
			platformLong2.x = 230;
			platformLong2.y = 190;
			platformSmall.x = 100;
			platformSmall.y = 270;
			platformSmall2.x = 140;
			platformSmall2.y = 320;}
		// Teleport from Magic Realm 0 to Apathyville
		else if (currentWorld == -1){
			// Force player to move to world 5 instead of retyping world data
			currentWorld = 4;
			player.x = canvas.width+1;}
	}
};

// Enemy
var enemy = {
	color: "red",
	speed: 3,
	exp: 5,
	alive: 1,
	goingRight: 1,
	x: 150,
	y: 310,
	width: 20,
	height: 20,
	draw: function(){
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	wander: function(){
		if (this.x >= platformLong.x + platformLong.width/2 - this.width/2){
			this.goingRight = 0;}
		if (this.x <= platformLong.x - platformLong.width/2 + this.width/2){
			this.goingRight = 1;}
		if (this.goingRight == 0){
			this.x--;}
		if (this.goingRight == 1){
			this.x++;}
	},
	hit: function(){
	if (hitCooldown == 0){
		player.health--;
		hitCooldown = 30;
		if (player.health <= 0){
			gameOver = 1;}}
	}
};

// Enemy 2
var enemy2 = {
	color: "red",
	speed: 3,
	exp: 5,
	alive: 1,
	goingRight: 1,
	x: 300,
	y: 120,
	width: 20,
	height: 20,
	draw: function(){
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	wander: function(){
		if (this.x >= platformLong2.x + platformLong2.width/2 - this.width/2){
			this.goingRight = 0;}
		if (this.x <= platformLong2.x - platformLong2.width/2 + this.width/2){
			this.goingRight = 1;}
		if (this.goingRight == 0){
			this.x--;}
		if (this.goingRight == 1){
			this.x++;}
	},
	hit: function(){
	if (hitCooldown == 0){
		player.health--;
		hitCooldown = 30;
		if (player.health <= 0){
			gameOver = 1;}}
	}
};

// Enemy that chases the player
var enemyChaser = {
	color: "red",
	speed: 2,
	exp: 5,
	alive: 0,
	x: -100,
	y: -100,
	width: 20,
	height: 20,
	draw: function(){
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
		ctx.fillStyle = "black";
		ctx.fillRect(this.x - this.width / 4,
			this.y - this.height / 4,
			this.width/2, this.height/2);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	chase: function(){
		if (this.x > player.x){
		this.x -= this.speed;}
		if (this.x < player.x){
		this.x += this.speed;} 
	},
	hit: function(){
	if (hitCooldown == 0){
		player.health--;
		hitCooldown = 30;
		if (player.health <= 0){
			gameOver = 1;}}
	}
};

// Enemy Boss that chases the player
var enemyBoss = {
	color: "red",
	speed: 2,
	exp: 50,
	health: 5,
	alive: 1,
	x: 300,
	y: 370,
	width: 60,
	height: 60,
	draw: function(){
		if (this.alive == 1 && currentWorld == 4){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
		ctx.fillStyle = "black";
		ctx.fillRect(this.x - this.width / 4,
			this.y - this.height / 4,
			this.width/2, this.height/2);
		// Draw health bars above the enemy
		ctx.fillStyle = "black";
		ctx.fillRect(this.x - this.width + 28, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 40, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 52, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 64, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 76, this.y - this.height - 2, 14, 14);
		if (this.health >= 1){
			ctx.fillStyle = "green";
			ctx.fillRect(this.x - this.width + 30, this.y - this.height, 10, 10);}
		if (this.health >= 2){
			ctx.fillRect(this.x - this.width + 42, this.y - this.height, 10, 10);}
		if (this.health >= 3){
			ctx.fillRect(this.x - this.width + 54, this.y - this.height, 10, 10);}
		if (this.health >= 4){
			ctx.fillRect(this.x - this.width + 66, this.y - this.height, 10, 10);}
		if (this.health >= 5){
			ctx.fillRect(this.x - this.width + 78, this.y - this.height, 10, 10);}
		}
		else{
			this.x = -100;
			this.y = -100;}
	},
	chase: function(){
		if (this.x > player.x){
		this.x -= this.speed;}
		if (this.x < player.x){
		this.x += this.speed;} 
	},
	hit: function(){
	if (hitCooldown == 0){
		player.health--;
		hitCooldown = 30;
		if (player.health <= 0){
			gameOver = 1;}}
	}
};

// Enemy Boss that chases the player with more health
var enemyBoss2 = {
	color: "red",
	speed: 2,
	exp: 100,
	health: 10,
	alive: 1,
	x: 300,
	y: 370,
	width: 60,
	height: 60,
	draw: function(){
		if (this.alive == 1 && currentWorld == -2){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
		ctx.fillStyle = "black";
		ctx.fillRect(this.x - this.width / 4,
			this.y - this.height / 4,
			this.width/2, this.height/2);
		// Draw health bars above the enemy
		ctx.fillStyle = "black";
		ctx.fillRect(this.x - this.width + 28, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 40, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 52, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 64, this.y - this.height - 2, 14, 14);
		ctx.fillRect(this.x - this.width + 76, this.y - this.height - 2, 14, 14);
		if (this.health >= 1){
			ctx.fillStyle = "green";
			ctx.fillRect(this.x - this.width + 30, this.y - this.height, 10, 10);}
		if (this.health >= 2){
			ctx.fillRect(this.x - this.width + 42, this.y - this.height, 10, 10);}
		if (this.health >= 3){
			ctx.fillRect(this.x - this.width + 54, this.y - this.height, 10, 10);}
		if (this.health >= 4){
			ctx.fillRect(this.x - this.width + 66, this.y - this.height, 10, 10);}
		if (this.health >= 5){
			ctx.fillRect(this.x - this.width + 78, this.y - this.height, 10, 10);}
		if (this.health >= 6){
			ctx.fillStyle = "yellow";
			ctx.fillRect(this.x - this.width + 30, this.y - this.height, 10, 10);}
		if (this.health >= 7){
			ctx.fillRect(this.x - this.width + 42, this.y - this.height, 10, 10);}
		if (this.health >= 8){
			ctx.fillRect(this.x - this.width + 54, this.y - this.height, 10, 10);}
		if (this.health >= 9){
			ctx.fillRect(this.x - this.width + 66, this.y - this.height, 10, 10);}
		if (this.health >= 10){
			ctx.fillRect(this.x - this.width + 78, this.y - this.height, 10, 10);}
		}
		else{
			this.x = -100;
			this.y = -100;}
	},
	chase: function(){
		if (this.x > player.x){
		this.x -= this.speed;}
		if (this.x < player.x){
		this.x += this.speed;} 
	},
	hit: function(){
	if (hitCooldown == 0){
		player.health--;
		hitCooldown = 30;
		if (player.health <= 0){
			gameOver = 1;}}
	}
};

// NPC that talks to the player
var npc = {
	color: "purple",
	alive: 0,
	msgTime: 0,
	x: -100,
	y: -100,
	width: 20,
	height: 20,
	draw: function(){
		if (this.msgTime > 0){
			ctx.fillStyle = "black";
			ctx.font = "10pt Arial";
			ctx.fillText("You're no hero just for getting here.", this.x - this.width*4, this.y - this.height);
			this.msgTime--;}
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	hit: function(){
		this.msgTime = 15;
	}
};

// NPC that heals the player
var npcHealer = {
	color: "green",
	alive: 0,
	msgTime: 0,
	x: -100,
	y: -100,
	width: 20,
	height: 20,
	draw: function(){
		if (this.msgTime > 0){
			ctx.fillStyle = "black";
			ctx.font = "10pt Arial";
			ctx.fillText("I've restored your health. Now leave.", this.x - this.width*4, this.y - this.height);
			this.msgTime--;}
		if (this.alive == 1){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);}
		else{
			this.x = -100;
			this.y = -100;}
	},
	hit: function(){
		this.msgTime = 15;
		player.health++;
		if (player.health > player.maxHealth){
		player.health = player.maxHealth;}
	}
};


// Laser
var laser = {
	color: "blue",
	x: -100,
	y: -200,
	timeLeft: 0,
	speed: 8,
	width: 6,
	height: 6,
	draw: function(){
		if (this.timeLeft > 0){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);}
		else{
		this.x = -100;
		this.y = -200;}
	},
	shoot: function(){
		this.timeLeft = 20;
		this.x = player.x;
		this.y = player.y;
	},
	move: function(){
		if (this.timeLeft > 0 && player.goingRight == 1){
			this.timeLeft--;
			this.x += this.speed;}
		else if (this.timeLeft > 0 && player.goingRight == 0){
			this.timeLeft--;
			this.x -= this.speed;}
	}
};

// Platform
var platform = {
	color: "black",
	x: 185,
	y: 180,
	width: 50,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Platform 2
var platform2 = {
	color: "black",
	x: 260,
	y: 245,
	width: 50,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Long Platform
var platformLong = {
	color: "black",
	x: 160,
	y: 320,
	width: 100,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Long Platform 2
var platformLong2 = {
	color: "black",
	x: 300,
	y: 130,
	width: 100,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Small Platform
var platformSmall = {
	color: "black",
	x: -100,
	y: -100,
	width: 20,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Small Platform 2
var platformSmall2 = {
	color: "black",
	x: -100,
	y: -100,
	width: 20,
	height: 5,
	draw: function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.width / 2,
			this.y - this.height / 2,
			this.width, this.height);
	}
};

// Clear the canvas
var clear = function(){
	//Clear Game Frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Stats page
var drawStats = function(){
	ctx.fillStyle = "black";
	ctx.font = "10pt Arial";
	ctx.fillText("Overall Stats", 10, 15);
	ctx.fillText("Level: " + player.level, 10, 35);
	ctx.fillText("Exp: " + player.exp + "/" + player.level*player.level*100, 10, 55);
	ctx.fillText("Enemies Killed: " + kills, 10, 75);
	ctx.fillText("Deaths: " + deaths, 10, 95);
	ctx.fillText("Skills", 10, 135);
	if (skills.spikeUnlocked == 1){
		ctx.fillText("Spike (1) - " + skills.spikeUses + " total uses", 10, 155);}
};

// Game Over Screen
var drawGameOver = function(){
		ctx.fillStyle = "black";
		ctx.font = "30pt Arial";
		ctx.fillText("You have died.", 50, 150);
		ctx.font = "20pt Arial";
		ctx.fillText("Press Enter to respawn.", 45, 190);
};

// Background
var drawBG = function(){
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "white";
		ctx.fillRect(1, 1, canvas.width - 2, canvas.height - 2);
};

// Draw on the canvas
var draw = function(){
	clear();
	drawBG();
	player.draw();
	enemy.draw();
	enemy2.draw();
	enemyChaser.draw();
	enemyBoss.draw();
	enemyBoss2.draw();
	npc.draw();
	npcHealer.draw();
	portal.draw();
	platform.draw();
	platform2.draw();
	platformLong.draw();
	platformLong2.draw();
	platformSmall.draw();
	platformSmall2.draw();
	laser.draw();
	skills.draw();
	marker.draw();
	marker2.draw();
	if (stats == 1){
		clear();
		drawBG();
		drawStats();}
	if (gameOver == 1){
		clear();
		drawBG();
		drawGameOver();}
};

// Cooldown handling
var cdHandler = function(){
	if (cooldown > 0){
		cooldown--;}
	if (hitCooldown > 0){
		hitCooldown--;}
	if (skills.spikeCooldown > 0){
		skills.spikeCooldown--;
		if (skills.spikeCooldown < 20){
			skills.spikeY -= 10;}}
};

// All key conditions
var keys = function(){
	// W - Jump
	if (87 in keysDown && canJump == 1){
		canJump = 0;
		player.jspeed = 13; }
	// D - Move Right
	if (68 in keysDown){
		if (laser.timeLeft == 0){
		player.goingRight = 1;}
		player.x += player.mspeed;
		// Don't allow moving off the ride side of the screen in world -2
		if (currentWorld == -2 && player.x >= canvas.width){
		player.x = canvas.width; }}	
	// A - Move Left
	if (65 in keysDown){
		if (laser.timeLeft == 0){
		player.goingRight = 0;}
		player.x -= player.mspeed;
		// Don't allow moving off the left side of the screen in world 0 or -1
		if ((currentWorld == 0 || currentWorld == -1) && player.x <= 0){
		player.x = 0; }}
	// S - Drop Down
	if (83 in keysDown && canJump == 1 && player.y < canvas.height - player.height){
		player.y += player.height / 2;
		player.jspeed = -1;
		canJump = 0; }
	// Space - Fire laser
	if (32 in keysDown && cooldown == 0){
		cooldown = 20;
		laser.shoot();}
	// Enter - Display Stats or Respawn
	if (13 in keysDown && cooldown == 0){
		cooldown = 15;
		if (stats == 0){
		stats = 1;}
		else stats = 0;
		// Respawn
		if (gameOver == 1){
		gameOver = 0;
		stats = 0;
		deaths++;
		hitCooldown = 30;
		player.health = 1;
		player.x = -1;}}
	// 1 - Spike
	if (49 in keysDown && skills.spikeCooldown == 0 && skills.spikeUnlocked == 1){
		skills.spikeUses++;
		skills.spikeCooldown = 40;
		if (player.goingRight == 1){
			skills.spikeX = player.x + 70;}
		else{
			skills.spikeX = player.x - 70;}
		skills.spikeY = player.y;}
};

// Check if the player lands on something
var hitGround = function(){
	// Platform
	if ((player.x < platform.x + platform.width/2 + player.width/2 && player.x > platform.x - platform.width/2 - player.width/2)&&
	    (player.y <= platform.y - platform.height && player.y >= platform.y - platform.height - 10)){
	player.y = platform.y - player.height/2;
	canJump = 1;}
	// Platform2
	else if ((player.x < platform2.x + platform2.width/2 + player.width/2 && player.x > platform2.x - platform2.width/2 - player.width/2)&&
	    (player.y <= platform2.y - platform2.height && player.y >= platform2.y - platform2.height - 10)){
	player.y = platform2.y - player.height/2;
	canJump = 1;}
	// PlatformLong
	else if ((player.x < platformLong.x + platformLong.width/2 + player.width/2 && player.x > platformLong.x - platformLong.width/2 - player.width/2)&&
	    (player.y <= platformLong.y - platformLong.height && player.y >= platformLong.y - platformLong.height - 10)){
	player.y = platformLong.y - player.height/2;
	canJump = 1;}
	// PlatformLong2
	else if ((player.x < platformLong2.x + platformLong2.width/2 + player.width/2 && player.x > platformLong2.x - platformLong2.width/2 - player.width/2)&&
	    (player.y <= platformLong2.y - platformLong2.height && player.y >= platformLong2.y - platformLong2.height - 10)){
	player.y = platformLong2.y - player.height/2;
	canJump = 1;}
	// PlatformSmall
	else if ((player.x < platformSmall.x + platformSmall.width/2 + player.width/2 && player.x > platformSmall.x - platformSmall.width/2 - player.width/2)&&
	    (player.y <= platformSmall.y - platformSmall.height && player.y >= platformSmall.y - platformSmall.height - 10)){
	player.y = platformSmall.y - player.height/2;
	canJump = 1;}
	// PlatformSmall2
	else if ((player.x < platformSmall2.x + platformSmall2.width/2 + player.width/2 && player.x > platformSmall2.x - platformSmall2.width/2 - player.width/2)&&
	    (player.y <= platformSmall2.y - platformSmall2.height && player.y >= platformSmall2.y - platformSmall2.height - 10)){
	player.y = platformSmall2.y - player.height/2;
	canJump = 1;}
	// Bottom ground
	else if (player.y >= canvas.height - player.height){
	player.y = canvas.height - player.height/2;
	canJump = 1;}
	else canJump = 0;
};

// Check if the player or laser hits an enemy
var hitEnemy = function(){
	// Player hits enemy
	if ((enemy.x + enemy.width/2 >= player.x - player.width/2) && (enemy.x - enemy.width/2 <= player.x + player.width/2) &&
	(enemy.y + enemy.height/2 >= player.y - player.height/2) && (enemy.y - enemy.height/2 <= player.y + player.height/2)){
	enemy.hit();}
	// Player hits enemy2
	if ((enemy2.x + enemy2.width/2 >= player.x - player.width/2) && (enemy2.x - enemy2.width/2 <= player.x + player.width/2) &&
	(enemy2.y + enemy2.height/2 >= player.y - player.height/2) && (enemy2.y - enemy2.height/2 <= player.y + player.height/2)){
	enemy2.hit();}
	// Player hits enemyChaser
	if ((enemyChaser.x + enemyChaser.width/2 >= player.x - player.width/2) && (enemyChaser.x - enemyChaser.width/2 <= player.x + player.width/2) &&
	(enemyChaser.y + enemyChaser.height/2 >= player.y - player.height/2) && (enemyChaser.y - enemyChaser.height/2 <= player.y + player.height/2)){
	enemyChaser.hit();}
	// Player hits enemyBoss
	if ((enemyBoss.x + enemyBoss.width/2 >= player.x - player.width/2) && (enemyBoss.x - enemyBoss.width/2 <= player.x + player.width/2) &&
	(enemyBoss.y + enemyBoss.height/2 >= player.y - player.height/2) && (enemyBoss.y - enemyBoss.height/2 <= player.y + player.height/2)){
	enemyBoss.hit();}
	// Player hits enemyBoss2
	if ((enemyBoss2.x + enemyBoss2.width/2 >= player.x - player.width/2) && (enemyBoss2.x - enemyBoss2.width/2 <= player.x + player.width/2) &&
	(enemyBoss2.y + enemyBoss2.height/2 >= player.y - player.height/2) && (enemyBoss2.y - enemyBoss2.height/2 <= player.y + player.height/2)){
	enemyBoss2.hit();}
	// Player hits npc
	if ((npc.x + npc.width/2 >= player.x - player.width/2) && (npc.x - npc.width/2 <= player.x + player.width/2) &&
	(npc.y + npc.height/2 >= player.y - player.height/2) && (npc.y - npc.height/2 <= player.y + player.height/2)){
	npc.hit();}
	// Player hits npcHealer
	if ((npcHealer.x + npcHealer.width/2 >= player.x - player.width/2) && (npcHealer.x - npcHealer.width/2 <= player.x + player.width/2) &&
	(npcHealer.y + npcHealer.height/2 >= player.y - player.height/2) && (npcHealer.y - npcHealer.height/2 <= player.y + player.height/2)){
	npcHealer.hit();}
	// Player hits portal
	if ((portal.x + portal.width/2 >= player.x - player.width/2) && (portal.x - portal.width/2 <= player.x + player.width/2) &&
	(portal.y + portal.height/2 >= player.y - player.height/2) && (portal.y - portal.height/2 <= player.y + player.height/2)){
	portal.hit();}
	// Laser hits enemy
	if ((enemy.x + enemy.width/2 >= laser.x - laser.width/2) && (enemy.x - enemy.width/2 <= laser.x + laser.width/2) &&
	(enemy.y + enemy.height/2 >= laser.y - laser.height/2) && (enemy.y - enemy.height/2 <= laser.y + laser.height/2)){
	laser.x = -100;
	laser.y = -200;
	enemy.x = -100;
	enemy.y = -100;
	enemy.alive = 0;
	player.exp += enemy.exp;
	kills++;}
	// Laser hits enemy2
	if ((enemy2.x + enemy2.width/2 >= laser.x - laser.width/2) && (enemy2.x - enemy2.width/2 <= laser.x + laser.width/2) &&
	(enemy2.y + enemy2.height/2 >= laser.y - laser.height/2) && (enemy2.y - enemy2.height/2 <= laser.y + laser.height/2)){
	laser.x = -100;
	laser.y = -200;
	enemy2.x = -100;
	enemy2.y = -100;
	enemy2.alive = 0;
	player.exp += enemy2.exp;
	kills++;}
	// Laser hits enemyChaser
	if ((enemyChaser.x + enemyChaser.width/2 >= laser.x - laser.width/2) && (enemyChaser.x - enemyChaser.width/2 <= laser.x + laser.width/2) &&
	(enemyChaser.y + enemyChaser.height/2 >= laser.y - laser.height/2) && (enemyChaser.y - enemyChaser.height/2 <= laser.y + laser.height/2)){
	laser.x = -100;
	laser.y = -200;
	enemyChaser.x = -100;
	enemyChaser.y = -100;
	enemyChaser.alive = 0;
	player.exp += enemyChaser.exp;
	kills++;}
	// Laser hits enemyBoss
	if ((enemyBoss.x + enemyBoss.width/2 >= laser.x - laser.width/2) && (enemyBoss.x - enemyBoss.width/2 <= laser.x + laser.width/2) &&
	(enemyBoss.y + enemyBoss.height/2 >= laser.y - laser.height/2) && (enemyBoss.y - enemyBoss.height/2 <= laser.y + laser.height/2)){
	laser.x = -100;
	laser.y = -200;
	enemyBoss.health--;
	if (enemyBoss.health <= 0){
		enemyBoss.x = -100;
		enemyBoss.y = -100;
		enemyBoss.alive = 0;
		player.exp += enemyBoss.exp;
		kills++;}}
	// Laser hits enemyBoss2
	if ((enemyBoss2.x + enemyBoss2.width/2 >= laser.x - laser.width/2) && (enemyBoss2.x - enemyBoss2.width/2 <= laser.x + laser.width/2) &&
	(enemyBoss2.y + enemyBoss2.height/2 >= laser.y - laser.height/2) && (enemyBoss2.y - enemyBoss2.height/2 <= laser.y + laser.height/2)){
	laser.x = -100;
	laser.y = -200;
	enemyBoss2.health--;
	if (enemyBoss2.health <= 0){
		enemyBoss2.x = -100;
		enemyBoss2.y = -100;
		enemyBoss2.alive = 0;
		skills.spikeUnlocked = 1;
		marker2.timeLeft = 60;
		marker2.x = 100;
		marker2.y = 350;
		player.exp += enemyBoss2.exp;
		kills++;}}
	// Spike hits enemy
	if ((enemy.x + enemy.width/2 >= skills.spikeX - 2/2) && (enemy.x - enemy.width/2 <= skills.spikeX + 2) &&
	(enemy.y + enemy.height/2 >= skills.spikeY - 40/2) && (enemy.y - enemy.height/2 <= skills.spikeY + 40)){
	skills.spikeX = -100;
	skills.spikeY = -200;
	enemy.x = -100;
	enemy.y = -100;
	enemy.alive = 0;
	player.exp += enemy.exp;
	kills++;}
	// Spike hits enemy2
	if ((enemy2.x + enemy2.width/2 >= skills.spikeX - 2/2) && (enemy2.x - enemy2.width/2 <= skills.spikeX + 2) &&
	(enemy2.y + enemy2.height/2 >= skills.spikeY - 40/2) && (enemy2.y - enemy2.height/2 <= skills.spikeY + 40)){
	skills.spikeX = -100;
	skills.spikeY = -200;
	enemy2.x = -100;
	enemy2.y = -100;
	enemy2.alive = 0;
	player.exp += enemy2.exp;
	kills++;}
	// Spike hits enemyChaser
	if ((enemyChaser.x + enemyChaser.width/2 >= skills.spikeX - 2/2) && (enemyChaser.x - enemyChaser.width/2 <= skills.spikeX + 2) &&
	(enemyChaser.y + enemyChaser.height/2 >= skills.spikeY - 40/2) && (enemyChaser.y - enemyChaser.height/2 <= skills.spikeY + 40)){
	skills.spikeX = -100;
	skills.spikeY = -200;
	enemyChaser.x = -100;
	enemyChaser.y = -100;
	enemyChaser.alive = 0;
	player.exp += enemyChaser.exp;
	kills++;}
	// Spike hits enemyBoss
	if ((enemyBoss.x + enemyBoss.width/2 >= skills.spikeX - 2/2) && (enemyBoss.x - enemyBoss.width/2 <= skills.spikeX + 2) &&
	(enemyBoss.y + enemyBoss.height/2 >= skills.spikeY - 40/2) && (enemyBoss.y - enemyBoss.height/2 <= skills.spikeY + 40)){
	skills.spikeX = -100;
	skills.spikeY = -200;
	enemyBoss.health -= 2;
	player.exp += enemyBoss.exp;
	if (enemyBoss.health <= 0){
		enemyBoss.x = -100;
		enemyBoss.y = -100;
		enemyBoss.alive = 0;
		player.exp += enemyBoss.exp;
		kills++;}}
	// Spike hits enemyBoss2
	if ((enemyBoss2.x + enemyBoss2.width/2 >= skills.spikeX - 2/2) && (enemyBoss2.x - enemyBoss2.width/2 <= skills.spikeX + 2) &&
	(enemyBoss2.y + enemyBoss2.height/2 >= skills.spikeY - 40/2) && (enemyBoss2.y - enemyBoss2.height/2 <= skills.spikeY + 40)){
	skills.spikeX = -100;
	skills.spikeY = -200;
	enemyBoss2.health -= 2;
	player.exp += enemyBoss2.exp;
	if (enemyBoss2.health <= 0){
		enemyBoss2.x = -100;
		enemyBoss2.y = -100;
		enemyBoss2.alive = 0;
		skills.spikeUnlocked = 1;
		marker2.timeLeft = 60;
		marker2.x = 100;
		marker2.y = 350;
		player.exp += enemyBoss2.exp;
		kills++;}}
};

// Check for level ups
var levelUp = function(){
	if (player.exp >= player.level*player.level*100){
		player.level++;
		player.maxHealth++;
		player.health = player.maxHealth;
		marker.timeLeft = 60;
		marker.x = 100;
		marker.y = 250;}
};

// Change the scene to the next world
var worldMove = function(){
	// Move to world 0 - Starting area
	if (player.x < 0 && currentWorld == 1){
		player.x = canvas.width;
		currentWorld = 0;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 150;
		enemy.y = 310;
		enemy2.alive = 1;
		enemy2.x = 300;
		enemy2.y = 120;
		enemyChaser.alive = 0;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 185;
		platform.y = 180;
		platform2.x = 260;
		platform2.y = 245;
		platformLong.x = 160;
		platformLong.y = 320;
		platformLong2.x = 300;
		platformLong2.y = 130;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to world 1
	if ((player.x > canvas.width && currentWorld == 0) ||
		(player.x < 0 && currentWorld == 2)){
		if (currentWorld == 0){
		player.x = 0;}
		else{
		player.x = canvas.width;}
		currentWorld = 1;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 200;
		enemy.y = 90;
		enemy2.alive = 0;
		enemyChaser.alive = 1;
		enemyChaser.x = 200;
		enemyChaser.y = 390;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 280;
		platform.y = 310;
		platform2.x = 260;
		platform2.y = 230;
		platformLong.x = 180;
		platformLong.y = 100;
		platformLong2.x = 160;
		platformLong2.y = 160;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to world 2
	if ((player.x > canvas.width && currentWorld == 1) ||
		(player.x < 0 && currentWorld == 3)){
		if (currentWorld == 1){
		player.x = 0;}
		else{
		player.x = canvas.width;}
		currentWorld = 2;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 200;
		enemy.y = 170;
		enemy2.alive = 1;
		enemy2.x = 245;
		enemy2.y = 100;
		enemyChaser.alive = 0;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 280;
		platform.y = 320;
		platform2.x = 190;
		platform2.y = 260;
		platformLong.x = 180;
		platformLong.y = 180;
		platformLong2.x = 260;
		platformLong2.y = 110;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to world 3
	if ((player.x > canvas.width && currentWorld == 2) ||
		(player.x < 0 && currentWorld == 4)){
		if (currentWorld == 2){
		player.x = 0;}
		else{
		player.x = canvas.width;}
		currentWorld = 3;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 200;
		enemy.y = 240;
		enemy2.alive = 1;
		enemy2.x = 260;
		enemy2.y = 200;
		enemyChaser.alive = 1;
		enemyChaser.x = 200;
		enemyChaser.y = 390;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 130;
		platform.y = 290;
		platform2.x = 80;
		platform2.y = 320;
		platformLong.x = 180;
		platformLong.y = 250;
		platformLong2.x = 260;
		platformLong2.y = 210;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to world 4 - First boss
	if ((player.x > canvas.width && currentWorld == 3) ||
		(player.x < 0 && currentWorld == 5)){
		if (currentWorld == 3){
		player.x = 0;}
		else{
		player.x = canvas.width;}
		currentWorld = 4;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 0;
		enemy2.alive = 0;
		enemyChaser.alive = 0;
		enemyBoss.x = 300;
		enemyBoss.y = 370;
		enemyBoss.health = 5;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 130;
		platform.y = 310;
		platform2.x = 80;
		platform2.y = 350;
		platformLong.x = 180;
		platformLong.y = 270;
		platformLong2.x = 120;
		platformLong2.y = 220;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to world 5 - First town
	if ((player.x > canvas.width && currentWorld == 4) ||
		(player.x < 0 && currentWorld == 6)){
		if (currentWorld == 4){
		player.x = 0;}
		else{
		player.x = canvas.width;}
		currentWorld = 5;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 0;
		enemy2.alive = 0;
		enemyChaser.alive = 0;
		npc.alive = 1;
		npc.x = 250;
		npc.y = 390;
		npcHealer.alive = 1;
		npcHealer.x = 150;
		npcHealer.y = 280;
		portal.alive = 1;
		portal.x = 340;
		portal.y = 270;
		platform.x = 140;
		platform.y = 350;
		platform2.x = 330;
		platform2.y = 350;
		platformLong.x = 150;
		platformLong.y = 290;
		platformLong2.x = 340;
		platformLong2.y = 290;
		platformSmall.x = -100;
		platformSmall.y = -100;
		platformSmall2.x = -100;
		platformSmall2.y = -100;}
	// Move to Magic Realm starting area	
	if (player.x < 0 && currentWorld == -2){
		currentWorld = -1;
		player.x = canvas.width;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 200;
		enemy.y = 230;
		enemy2.alive = 1;
		enemy2.x = 240;
		enemy2.y = 180;
		enemyChaser.alive = 1;
		enemyChaser.x = 200;
		enemyChaser.y = 390;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 1;
		portal.x = 250;
		portal.y = 80;
		platform.x = 250;
		platform.y = 100;
		platform2.x = 30;
		platform2.y = 320;
		platformLong.x = 180;
		platformLong.y = 240;
		platformLong2.x = 230;
		platformLong2.y = 190;
		platformSmall.x = 100;
		platformSmall.y = 270;
		platformSmall2.x = 140;
		platformSmall2.y = 320;}
	// Move to Magic Realm Boss Zone
	if (player.x > canvas.width && currentWorld == -1){
		currentWorld = -2;
		player.x = 0;
		laser.x = -100;
		laser.y = -200;
		enemy.alive = 1;
		enemy.x = 30;
		enemy.y = 240;
		enemy2.alive = 0;
		enemyChaser.alive = 0;
		enemyBoss2.x = 300;
		enemyBoss2.y = 370;
		enemyBoss2.health = 10;
		npc.alive = 0;
		npcHealer.alive = 0;
		portal.alive = 0;
		platform.x = 140;
		platform.y = 120;
		platform2.x = -100;
		platform2.y = -100;
		platformLong.x = 30;
		platformLong.y = 250;
		platformLong2.x = -100;
		platformLong2.y = -100;
		platformSmall.x = 130;
		platformSmall.y = 190;
		platformSmall2.x = 50;
		platformSmall2.y = 320;}
};	

// Run Everything
setInterval(function(){
  keys();
  player.physics();
  laser.move();
  enemy.wander();
  enemy2.wander();
  enemyChaser.chase();
  enemyBoss.chase();
  enemyBoss2.chase();
  marker.move();
  marker2.move();
  cdHandler();
  hitGround();
  hitEnemy();
  worldMove();
  levelUp();
  draw();
  frames++;
}, 1000/FPS);
