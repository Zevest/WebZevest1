var rects = [];
var nbRect;
var mxSize = 130;

function setup(){
	createCanvas(960,960);
	noStroke();
	nbRect = (width * height) / (mxSize *mxSize) + 10;
  	for(var i = 0; i< nbRect; i++){
    	var rec = newRect();
    	while(hitTestAll(rec)){
      		rec = newRect();
    	}
    	rects.push(rec);
  	}
}

function draw(){
	for(var i = 0; i< rects.length; i++){
		fill(rects[i].col);
		rect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
	}
}

function randomColor(){
  return "#" + Math.round(Math.random() * 0xFFFFFF).toString(16);
}

function hitTest(r1, r2){
  return ((r1.x +r1.w > r2.x) &&
		 (r1.x < r2.x + r2.w) &&
		 (r1.y +r1.h > r2.y) &&
		 (r1.y < r2.y + r2.h));
}

function newRect(){
	var	wi = random(40, mxSize);
	var he = random(40, mxSize)
	rec =  {w: wi,
			h: he,
			x: random(width-wi),
			y: random(height-he),
			col: randomColor()
			};
   return rec;
}

function hitTestAll(r1){
  if(rects.length < 1){
      return false;
	}
  for(var i = 0; i < rects.length; i++){
    if(hitTest(r1, rects[i])){
      return true;
    }
  }
  return false;
}
