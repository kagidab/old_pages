

const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
canvas.width = 600; 
canvas.height = 600;

const GROUND_LEVEL = 200;
const STARTX  = canvas.width / 2;
const STARTY  = 400;
const STARTWIDTH = 80;
const STARTHEIGHT = 80;
const FPS = 60;

const scenes = {PLAY: 0, DIE: 1};

let darkChance = 1/20; // n/m: n times every m seconds
  
let background = new Image();
let leftDown = rightDown = false;
background.src = "background.png"; 

let player = {	img: new Image(), x: STARTX, y: STARTY, 
	height: 80, width: 80, vx : 0,
	head: {
		img: new Image(),
		height: STARTHEIGHT, width: STARTWIDTH,
		radius: STARTWIDTH/2
	},
	score: 0,
	ticks: 0
};
player.img.src = "player.png";
player.head.img.src = "head.png";

let items = [];
let itemChance = (2 / 1) / FPS;

let behaviours = [];
behaviours.SWIM = (item) => {
	if(item.dir == undefined){
		item.dir = Math.floor(Math.random()*2);
		item.phase = Math.random()*6.28;
	}
	item.y += 2*Math.cos(player.ticks/100+item.phase);
	if(item.dir === 0){
		item.x -= 1;
		//if (item.x < 0) item.dir = 1;
	} else {
		item.x += 1;
		//if (item.x + item.width > canvas.width) item.dir = 0;
	}
};

let itemTypes = [{type: "red circle", img:"item1.png"}, 
				 {type: "blue circle", img: "item2.png"},
				 {type: "fish", img: "fish.png", behaviour: behaviours.SWIM}
				 ];

let backgroundPos = canvas.width; 
let scrollSpeed = 3;

let scene = scenes.PLAY;

class Item {
	constructor() {
		this.type = Math.floor(Math.random() * itemTypes.length);
		this.img = new Image();
		this.behaviour = itemTypes[this.type].behaviour;
		this.img.src = itemTypes[this.type].img;
		this.width = 30;
		this.height = 30;
		this.radius = 15;
		this.x = Math.floor(Math.random() * (canvas.width - 10 - this.width)) + 10;
		this.y = -this.height;
		this.dark = false;
	}
}

function reset() {
	player.x = STARTX; player.y = STARTY;
	player.head.width = STARTWIDTH;
	player.head.height = STARTHEIGHT;
	player.head.radius = STARTWIDTH / 2;
	player.ticks = 0;
	items = [];
	scene = scenes.PLAY;
	player.score = 0;
}


const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 30;
offscreenCanvas.height = 30;
const osCtx = offscreenCanvas.getContext('2d');

function drawThing(thing) {
	if(!thing.dark){
		ctx.drawImage(thing.img, thing.x, canvas.height - thing.y - thing.height, thing.width, thing.height);
	} else {
		ctx.beginPath();
		if(thing.darkness == undefined) thing.darkness = .1
			else thing.darkness = Math.min(thing.darkness+.02, 0.6)
		
		// stupid method
		osCtx.drawImage(thing.img, 0, 0, thing.width, thing.height);
		osCtx.globalCompositeOperation = "multiply"
		osCtx.fillStyle = "rgb(0,0,0,"+thing.darkness+")";
		osCtx.fillRect(0, 0, thing.width, thing.height);
		osCtx.globalCompositeOperation = "destination-in";
		osCtx.drawImage(thing.img, 0, 0, thing.width, thing.height);
		osCtx.globalCompositeOperation = "source-over"; 
		ctx.drawImage(offscreenCanvas, thing.x, canvas.height - thing.y - thing.height, thing.width, thing.height);

	}
}

function drawBackground(moving){
	ctx.drawImage(background, 0, backgroundPos);
    ctx.drawImage(background, 0, backgroundPos - canvas.height); 
    if(scene === scenes.PLAY) backgroundPos -= scrollSpeed; 
    if (backgroundPos == 0) 
        backgroundPos = canvas.width;
}

function drawPlayer() {
	if(leftDown) player.vx -=.3;
	if(rightDown) player.vx +=.3;
	player.x += player.vx;
	if (player.x <=10) {
		player.x = 10;
		player.vx = 0;
	}
	if (player.x >= canvas.width - player.width - 10) {
		player.x = canvas.width - 10 - player.width;
		player.vx = 0;
	}
	player.vx = 0.95*player.vx;

	player.head.x = player.x + (player.width - player.head.width) / 2;
	player.head.y = player.y + player.height// + player.head.height;

	//console.log(player.headx,player.heady, player.x, player.y, player.headx, player.headx+player.headWidth, player.heady, player.heady+player.headHeight);

	drawThing(player);
	drawThing(player.head);
}

function center(item) {
	return {x: item.x + item.width/2, y: item.y + item.height/2};
}

function drawScore() {
	if (scene == scenes.PLAY) player.score += ((player.head.radius - STARTWIDTH/2 + 5)/5) ** 1.5;
	ctx.font = "30px Arial";
	ctx.fillText(Math.floor(player.score), 10, 50);
}

function distanceSquared(item1, item2){
	let center1 = center(item1);
	let center2 = center(item2);
	let diff = {x: center1.x - center2.x, y: center1.y - center2.y};
	return diff.x ** 2 + diff.y ** 2;
}

function intersect(item) {
	//console.log(player.headx, item.x)
	/*if (player.head.x < item.x + item.width && player.head.x + player.head.width > item.x
		 && player.head.y < item.y + item.height && player.head.y + player.head.height > item.y
		){
		return false;
	}*/
	if(distanceSquared(item, player.head) < (player.head.radius + item.radius)**2) return false;
	return true;
}

function playerDie(){
	if(player.head.y < -100) reset();
	player.y-=5;
	player.head.y-=5;
	drawThing(player);
	drawThing(player.head);

}

function handleItems() {
	if (Math.random() < itemChance){
		items.push(new Item());
	}
	for (let item of items) {
		if(scene === scenes.PLAY) {
			item.y += scrollSpeed;
			if (item.dark){
			} else {
				if(Math.random() < darkChance / FPS) item.dark = true;
			}
		}
		if (item.behaviour != undefined) {
			//console.log(item);
			item.behaviour(item);
		}
		drawThing(item);
	}

	if(scene === scenes.PLAY) {
		let hit = items.filter(item => !intersect(item));
		if (hit.filter(item => item.dark).length) {
			player.head.width += 10;
			player.head.height += 10;
			player.head.radius += 5;
		}
		if (hit.filter(item => !item.dark).length){
			scene = scenes.DIE;
		}
		items = items.filter(item => item.y < canvas.height).filter(intersect);
	}
	
	//console.log(items);
}

window.onload = function() { 
    function loop() {
    	player.ticks++;
	    drawBackground();
	    if(scene === scenes.DIE) playerDie();
	    else drawPlayer();
	    handleItems();
	    drawScore();
		window.requestAnimationFrame(loop);
	}
	loop();

	window.onkeydown = function(event) {
		//console.log(event);
		if(event.key == 'a' || event.key=='ArrowLeft'){
			leftDown = true;
		}
		if(event.key == 'd' || event.key=='ArrowRight'){
			rightDown = true;
		}
	}
	window.onkeyup = function(event) {
		if(event.key == 'a' || event.key=='ArrowLeft'){
			leftDown = false;
		}
		if(event.key == 'd' || event.key=='ArrowRight'){
			rightDown = false;
		}
	}
}
/*
	let tick = () => {
		console.log(1);
		setTimeout(tick, 1000);
	}
	tick();*/	
