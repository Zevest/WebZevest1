window.addEventListener("load", main);
var rects = []; // Stock l'ensemble des rect
var nbRect = 50;

function main(){
  for(var i = 0; i< nbRect; i++){
    var rect = newRect();
    while(hitTestAll(rect)){
      rect = newRect();
    }
    rects.push(rect);
    document.body.appendChild(factory(rect));
  }
  console.log(rects);
}
//Convertie un rect en "div" colorée
function factory(rect){
  element = document.createElement("div");
  element.style.backgroundColor = randomColor();
  element.style.position = "absolute"
  element.style.left = rect.x + "px";
  element.style.top = rect.y + "px";
  element.style.height = rect.w + "px";
  element.style.width = rect.h + "px";
  return element;
}

// Renvoie un nombre aléatoire
function random(){
  var min = 0;
  var max = 1;
  if(arguments.length == 1){
    max = arguments[0];
  }else if (arguments.length == 2) {
    min = arguments[0];
    max = arguments[1];
  }
  return Math.floor(Math.random()*(max - min)) + min;
}

// Simplification de console.log()
function print(){
  for(var i =0; i< arguments.length; i++){
    console.log(arguments[i]);
  }
}
// Renvoie une une couleur en hexadecimal choisi au hasard
function randomColor(){
  return "#" + Math.round(Math.random() * 0xFFFFFF).toString(16);
}

// Verifie si deux object rect entre en colission
function hitTest(r1, r2){
  return (((r1.x + r1.w >= r2.x) && (r1.x <= r2.x + r2.w)) &&
          ((r1.y + r1.h >= r2.y) && (r1.y <= r2.y + r2.h)));
}
// Creation d'un objet rect
function newRect(){
   rect = {x: random(document.body.clientWidth),
           y: random(Math.max( window.innerHeight, document.body.clientHeight )),
           w: random(40, 150),
           h: random(40, 150)
          };
   return rect;
}

// Test la collision avec tout les autre rect crées précédement
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
