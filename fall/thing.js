
function Thing(pos, dim, imageLeft, imageRight, speed, room){
	this.pos = pos;
	this.dim = dim;
	this.v = new Vector();
	this.abs = false;


	if (imageLeft) {
		this.imageLeft = new Image();
		this.imageLeft.src = imageLeft;
	}
	if (imageRight) {
		this.imageRight = new Image();
		this.imageRight.src = imageRight;
	}
	
	this.speed = speed || 0;
	this.room = room || 0;
}

Thing.prototype = {
	draw: function(screen){
		screen.drawThing(this.v.x < 0 ? this.imageLeft : this.imageRight,
			this.pos, this.dim);
	},

	topLeft: function() {
		return this.pos;
	},

	topMiddle: function() {
		return new Vector(this.pos.x + this.dim.x / 2, this.pos.y);
	},
	
	topRight: function() {
		return new Vector(this.pos.x + this.dim.x, this.pos.y);
	},

	middleLeft: function() {
		return new Vector(this.pos.x + this.dim.x, this.pos.y - this.dim.y / 2);
	},

	middle: function() {
		return new Vector(this.pos.x + this.dim.x/2, this.pos.y - this.dim.y / 2);
	},

	middleRight: function() {
		return new Vector(this.pos.x + this.dim.x, this.pos.y - this.dim.y / 2);
	},

	bottomLeft: function() {
		return new Vector(this.pos.x, this.pos.y - this.dim.y);
	},
	
	bottomMiddle: function() {
		return new Vector(this.pos.x + this.dim.x / 2, this.pos.y - this.dim.y);
	},

	bottomRight: function() {
		return new Vector(this.pos.x + this.dim.x, this.pos.y - this.dim.y);
	},

	left: function() {
		return this.pos.x;
	},

	right: function(){
		return this.pos.x + this.dim.x;
	},

	up: function(){
		return this.pos.y;
	},

	down: function(){
		if(this.abs) return this.pos.y + this.dim.y;
		return this.pos.y - this.dim.y;
	}

}