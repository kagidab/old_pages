let WIDTH = 2000;
let HEIGHT = 2000;
let circles = [];
let canvas;
let ctx;

function distsqu(circle1, circle2){
  return (circle1.x - circle2.x) ** 2 + (circle1.y - circle2.y) ** 2; 
}

function inter(circle1, circles){
  for(circle2 of circles){
    //console.log(x, y, size, circle)
    if(distsqu(circle1, circle2) < (circle1.size + circle2.size) ** 2){
      return true;
    }
  }
  return false;
}

function newCircle(){
  let circle = {size: Math.random() * 1800, x: Math.random() * WIDTH,  y: Math.random() * HEIGHT};
  let outside = true;

  while(outside) {
    outside = false;
    for(testCircle of circles) { 
      //console.log(distsqu(testCircle, circle) < testCircle.size ** 2); 
      if(distsqu(testCircle, circle) < testCircle.size ** 2) {
        circle = {size: Math.random() * 1800, x: Math.random() * WIDTH,  y: Math.random() * HEIGHT};
        outside = true;
      }
    }
  }

  let giveup = false;
  while(circle.x - circle.size < 0 || circle.x + circle.size > WIDTH || circle.y - circle.size < 0 || circle.y + circle.size > HEIGHT || inter(circle, circles)){
    circle.size /= 1.5; // do binary search instead
    if(circle.size < 5) {
      giveup = true; break;
    }
  }
  if(giveup) {
    //i--; continue;
  }

  if(Math.random() < 0.5){
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'green';
  } else {
    ctx.strokeStyle = 'green';
    ctx.fillStyle = 'black';
  }
  ctx.beginPath()
  ctx.arc(circle.x,circle.y, circle.size, 0, 6.28);
  ctx.fill();
  ctx.moveTo(circle.x, circle.y);
  circles.push(circle);
  setTimeout(newCircle, 10);
}
window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingEnabled = true;
  newCircle();
}
