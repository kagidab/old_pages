const screen = new Screen(1000, 600, {left: 0, right: 600, top: -200, bottom: -600});

let FRICTION = 0.99;

let rooms = [
	[0,-500, 100,50],
	[300,-550, 100, 50],
	[500, -500, 100, 50],
	[660, -500, 100, 50],
	[660, -500, 100, 50]
].map((room) => new Thing(new Vector(room[0], room[1]), new Vector(room[2], room[3])));

let startCliff = new Vector(0, -550);
let cliff = [[100, -550], [300, -600], [400, -600]]
.map((point) => new Vector(point[0], point[1]));

let leftDown = false, rightDown = false, upDown = false, downDown = false;

let hamsters = [[50, -535], [320, -585], [420, -585], [520, -585]]
.map((ham) => new Thing(new Vector(ham[0], ham[1]), new Vector(25, 15), "hamleft.png", "hamright.png", 0.3, 0));

let fish = [];

let buttons = [new Thing(new Vector(0, 0), new Vector(30, 30))]
buttons[0].action = () => mode.toggleBuild();
buttons[0].abs = true;

for(let i = 0; i < 2; i++){
	fish.push(new Thing(new Vector(Math.random()*500, -500 + Math.random()*200), 
		new Vector(30, 30),
		"fish.png", 
		"fish.png",
		.1))
}

function within(thing, pos) {
	return thing.left() <= pos.x && thing.right() >= pos.x
	//debug(pos.x, thing.up(), thing.down(), pos.y)
	 thing.down() >= pos.y  && thing.up() >= pos.y;
}

function press(pos) {
	let pressed = buttons.filter((butt) => within(butt, pos));
	console.log(pressed);
}

let rnd = (amplitude) => (Math.random() - .5) * amplitude;
function debug(...message) {
	document.getElementById("debug").innerHTML=message.join(" ");
}

function gradient(p1, p2) {
	return (p2.y - p1.y) / (p2.x - p1.x);
}

function hamsterLoop(){

	for (let ham of hamsters) {
		screen.ctx.fillStyle = "#FF0000";
		ham.v.add(rnd(ham.speed));
		ham.v.multiply(FRICTION);
		ham.pos.add(ham.v);

		if(ham.pos.x < rooms[ham.room].pos.x) { //leaves to the left
			if(ham.room == 0) {
				ham.pos.x = rooms[ham.room].pos.x
				ham.v.x = 0;
			} else {
				ham.room--;
			}
		}

		if(rooms.length <= ham.room + 1){ //checks if in last room
			if(ham.right() > rooms[ham.room].right()) {
				ham.pos.x = rooms[ham.room].right() - ham.dim.x;
				ham.v.x = 0;
			}
			ham.pos.y = rooms[ham.room].down() + ham.dim.y;
		} else if(ham.right() > rooms[ham.room].right()) { // in tunnle
			const tunnle = getTunnle(rooms[ham.room], rooms[ham.room + 1]);
			ham.pos.y = tunnle[3].y + ham.dim.y + 
			 ((ham.left()+ham.right())/2 - rooms[ham.room].right()) *
			 gradient(tunnle[3], tunnle[2]);
			if(ham.right() > rooms[ham.room + 1].left()) {
				ham.room++;
			}
		} else {
			ham.pos.y = rooms[ham.room].pos.y - rooms[ham.room].dim.y + ham.dim.y;
		}
		ham.draw(screen);
	}
}

function handleFish() {
	for(let fis of fish) {
		fis.v.add(new Vector(rnd(fis.speed), rnd(fis.speed)));
		fis.pos.add(fis.v);
		fis.v.multiply(0.99);
		fis.draw(screen);
	}
}

function getTunnle(room1, room2) {
	return [
		Vector.add(room1.topRight(), new Vector(0, -10)),
		Vector.add(room2.topLeft(), new Vector(0, -10)),
		Vector.add(room2.bottomLeft(), new Vector(0, 10)),
		Vector.add(room1.bottomRight(), new Vector(0, 10))
	];
}

function handleRooms(){
	screen.ctx.fillStyle = "rgb(200, 0, 200, .3)";
	screen.ctx.lineWidth = 1;
	for(let i = 0; i < rooms.length - 1; i++){
		screen.shape(getTunnle(rooms[i], rooms[i + 1]));
	}

	screen.ctx.fillStyle = "rgb(100, 100, 100, 0.5)";
	for(let i = 0; i < rooms.length; i++){	
		screen.rect(rooms[i].pos, rooms[i].dim);
	}
}

function handleKeys() {
	if (leftDown) screen.moveScreen(-5, 0);
	if (rightDown) screen.moveScreen(5, 0);
	if (upDown) screen.moveScreen(0, 5);
	if (downDown) screen.moveScreen(0, -5);
}

function handleBottom() {
	screen.ctx.beginPath();
	screen.moveTo(startCliff);
	screen.ctx.fillStyle = "#888800";
	screen.ctx.lineWidth = 1;
	screen.bottom(cliff);
}

function handleButtons() {
	buttons.forEach(butt=>screen.rectAbs(butt.pos, butt.dim));
}


window.onload = function(){

	function loop() {
		screen.ctx.fillStyle = "rgb(0,0,150)";
		screen.ctx.fillRect(0,0, canvas.width, canvas.height); // water background
		handleKeys();
		handleFish();
		handleBottom();		
		handleRooms();
		hamsterLoop();
		handleButtons();
		window.requestAnimationFrame(loop);
	}
	loop();
}

window.onkeydown = function(event) {
	if(event.key == 'a' || event.key == 'ArrowLeft') leftDown = true;
	if(event.key == 'd' || event.key == 'ArrowRight') rightDown = true;
	if(event.key == 'w' || event.key == 'ArrowUp') upDown = true;
	if(event.key == 's' || event.key == 'ArrowDown') downDown = true;
	if(event.key == '=') screen.zoom(.9);
	if(event.key == '-') screen.zoom(1.1);
}

window.onmousedown = function(event) {
	press(new Vector(event.layerX - screen.canvas.offsetLeft, event.layerY - screen.canvas.offsetTop))
	//debug((event.layerY - screen.canvas.offsetTop),(event.layerX - screen.canvas.offsetLeft));
}

window.onkeyup = function(event) {
	if(event.key == 'a' || event.key == 'ArrowLeft') leftDown = false;
	if(event.key == 'd' || event.key == 'ArrowRight') rightDown = false;
	if(event.key == 'w' || event.key == 'ArrowUp') upDown = false;
	if(event.key == 's' || event.key == 'ArrowDown') downDown = false;
}