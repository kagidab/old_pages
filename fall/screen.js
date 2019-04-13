function Screen(width, height, viewport) {
	this.canvas = document.getElementById('canvas'); 
	this.canvas.width = 1000; 
	this.canvas.height = 600;
	this.ctx = this.canvas.getContext('2d');
	this.viewport = viewport;
	this.scale = new Vector(this.canvas.width / (this.viewport.right - this.viewport.left), 
	this.canvas.height / (this.viewport.top - this.viewport.bottom));
	this.zoomed = 1;
}

Screen.prototype = {
	translate: function(pos) {
		return new Vector((pos.x - this.viewport.left) * this.scale.x,
			(this.viewport.top - pos.y) * this.scale.y);
	},

	drawThing: function(image, pos, dim){
		const onScreen = this.translate(pos);
		//	console.log(onScreen.x, onScreen.y)
		this.ctx.drawImage(image,
			onScreen.x, onScreen.y,
			dim.x * this.scale.x, dim.y * this.scale.y);
	},

	moveScreen: function(dx, dy) {
		//if(this.viewport.left + dx > 0){
			this.viewport.left += dx / this.scale.x;
			this.viewport.right += dx / this.scale.x;
		//}	
		this.viewport.top += dy / this.scale.y;
		this.viewport.bottom += dy / this.scale.y;
	},

	moveTo: function(pos) {
		const onScreen = this.translate(pos);
		this.ctx.moveTo(onScreen.x, onScreen.y);
	},

	lineTo: function(pos) {
		const onScreen = this.translate(pos);
		this.ctx.lineTo(onScreen.x, onScreen.y);
		this.ctx.stroke();
	},

	rect: function(pos, dim) {
		const onScreen = this.translate(pos);
		this.ctx.beginPath();
		this.ctx.rect(
			onScreen.x, onScreen.y,
			dim.x * this.scale.x, dim.y * this.scale.y);
		this.ctx.fill();
		this.ctx.stroke();
	},

	rectAbs: function(pos, dim) {
		this.ctx.beginPath();
		this.ctx.rect(
			pos.x, pos.y,
			dim.x, dim.y);
		this.ctx.fill();
		this.ctx.stroke();
	},

	shape: function(points) {
		this.ctx.beginPath();
		this.moveTo(points[0]);
		for(let i = 0; i < points.length; i++)
			this.lineTo(points[i]);
		this.lineTo(points[0]);
		this.ctx.fill();
	},

	bottom: function(points) {
		let left = new Vector(this.viewport.left, points[0].y);
		let leftBot = new Vector(this.viewport.left, this.viewport.bottom);
		let right = new Vector(this.viewport.right, points[points.length - 1].y);
		let rightBot = new Vector(this.viewport.right, this.viewport.bottom);
		this.shape([left, ...points, right, rightBot, leftBot]);
	},

	zoom: function(percent) {
		this.zoomed *= percent;
		const height = percent * (this.viewport.top - this.viewport.bottom);
		const width = percent * (this.viewport.right - this.viewport.left);
		
		const midpoint = 
		{y: (this.viewport.top + this.viewport.bottom) / 2,
		 x: (this.viewport.right + this.viewport.left) / 2};
		 //midpoint.x = Math.max(width/2, midpoint.x);
		this.viewport = {left: midpoint.x - width / 2,
			right: midpoint.x + width / 2,
			top: midpoint.y + height / 2,
			bottom: midpoint.y - height / 2};
		this.scale = new Vector(this.canvas.width / (this.viewport.right - this.viewport.left), 
		this.canvas.height / (this.viewport.top - this.viewport.bottom));
	}

}