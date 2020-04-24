import { ShapeInfo, Intersection } from './index-esm.js';

let WIDTH = 2000;
let HEIGHT = 2000;
let colourArr = [Math.random() * 255, Math.random() * 255, Math.random() * 255]
let colour1 = 'rgb(' + contrastingColour(colourArr).join(',') + ')';
let colour2 = 'rgb(' + colourArr.join(',') + ')';
let shapes = [];
let canvas;
let ctx;

function randomShape() {
  let diceRoll = Math.random();
  if (diceRoll < 0.5) { 
    return new Circle();
  } else {
    return new Polygon();
  }
}

class Circle  {
  info() {
    return ShapeInfo.circle(this);
  }

  draw() {
    ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
  }

  constructor(newRectangle) {
    this.type = "circle";
    this.r = Math.random() * WIDTH / 3;
    this.cx = Math.random() * WIDTH;
    this.cy = Math.random() * HEIGHT;
  }

  reduceSize() {
    this.r /= 1.2;
  }
}

class Rectangle  {
  info() {
    return ShapeInfo.rectangle(this);
  }

  draw() {
    ctx.rect(this.x, this.y, this.w, this.h);
  }

  constructor() {
    this.x = Math.random() * WIDTH;
    this.y = Math.random() * HEIGHT; 
    this.w = Math.random() * WIDTH;
    this.h = Math.random() * HEIGHT;
  }

  reduceSize() {
    this.w /= 2;
    this.h /= 2;
  }
}

class Polygon {

  info() {
    return ShapeInfo.polygon(this.points);
  }

  draw() {
    ctx.lineTo(this.points[0], this.points[1]);
    ctx.lineTo(this.points[2], this.points[3]);
    ctx.lineTo(this.points[4], this.points[5]);
    ctx.lineTo(this.points[6], this.points[7]);
  }

  rotate(points) {
    return [
      this.cx + this.scale * (points[0] * Math.cos(this.theta) - points[1] * Math.sin(this.theta)),
      this.cy + this.scale * (points[0] * Math.sin(this.theta) + points[1] * Math.cos(this.theta))
    ];
  }

  makePoints() {
    this.points =
      [
        this.rotate([-this.w/2, -this.h/2]),
        this.rotate([this.w/2, -this.h/2]),
        this.rotate([this.w/2, this.h/2]),
        this.rotate([-this.w/2, this.h/2])
      ].flat();
  }

  constructor() {
    this.cx = Math.random() * WIDTH;
    this.cy = Math.random() * HEIGHT; 
    this.w  = Math.random() * WIDTH;
    this.h  = Math.random() * HEIGHT;
    this.theta = Math.random() * Math.PI * 2;
    this.scale = 1;
    this.makePoints();
  }

  reduceSize() {
    this.scale /= 2;
    this.makePoints();
  }

}

function fitToShape(shape, shapeTest) {
  let intersections = Intersection.intersect(shape.info(), shapeTest);
  //console.log(intersections);
  if (intersections.status === "Inside") return false;

  while (intersections.status === "Intersection") {
    shape.reduceSize(); 
    intersections = Intersection.intersect(shape.info(), shapeTest);
    if (intersections.status === "Inside") return false;
  }
  return true;
}

function loop() {
  let goodShape = true;
  let newShape = randomShape();

  for (let shapeTest of shapes) {
    goodShape = goodShape && fitToShape(newShape, shapeTest);
  }

  if (goodShape) {
    shapes.push(newShape.info());
    ctx.fillStyle = Math.random() < 0.5 ? colour1 : colour2;
    ctx.fillStyle = randomColour();
    ctx.beginPath()
    newShape.draw();
    ctx.closePath()
    ctx.fill();
  }

  setTimeout(loop, 1);
}

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  loop();
}

function contrastingColour(colour) {
  return [255 - colour[0], 255 - colour[1], 255 - colour[2]];
}

function randomColour() {
  colourArr[0] = (Math.random()*155);
  colourArr[1] = (Math.random()*155);
  colourArr[2] = 50 ;
  return 'rgb(' + colourArr.join(',') + ')'
}
