// Images
let img;
let bg;
let floor
let pipeImg = [];
let tap;
let pipes = [];
let title;
let birdFrame = [];

// Sound
let pointSound;
let slop;
let font;

// Config
let scrollSpeed = 1.5;
let bird;
let score;
let bestScore = 0;
let hited;

// Game State
let state;
const SCALE = 2;
const DEAD = 'dead';
const PLAYING = 'play';
const MENU = 'menu';
const FALLING = 'fall';

function preload() {
  img = loadImage('../ressources/FlappyBird/Mobile - Flappy Bird - Version 12 Sprites.png');
  pointSound = loadSound('../ressources/FlappyBird/coin.wav');
  slop = loadSound('../ressources/FlappyBird/fail.wav');
}

function reset() {
  status = MENU;
  bird = new Bird();
  pipes = [];
  score = 0;
  hitted = false;
}

function setup() {
  createCanvas(384, 512, P2D);
  // Loading image;
  bg = new DynamicImage(img, 0, 0, 128, 256);
  bg.moveSpeed = scrollSpeed / 3;
  floor = new DynamicImage(img, 290, 0, 144, 50);
  floor.moveSpeed = scrollSpeed;
  pipeImg.push(new DynamicImage(img, 56, 323, 26, 161));
  pipeImg.push(new DynamicImage(img, 84, 322, 26, 161));
  tap = new ImageCroped(img, 290, 80, 60, 60);
  font = FlappyNum.makeFont();
  title = new ImageCroped(img, 350, 90, 91, 25);
  for (let i = 0; i < 3; i++) {
    birdFrame.push(new ImageCroped(img, 2 + i * 28, 490, 18, 15));
  }
  reset();
}

function draw() {
  scale(SCALE);
  switch (status) {
    case PLAYING:
      play();
      if (frameCount % 90 == 0) {
        pipes.push(new Pipe(pipes, scrollSpeed, height / SCALE - floor.h - 10));
      }
      if (bird.collide(closest(pipes, bird.pos.x))) {
        if (!hitted) {
          slop.play();
        }
        status = FALLING;
      }
      if (bird.onGround()) {
        status = DEAD;
      }
      break;
    case MENU:
      wait();
      break;
    case FALLING:
      fall();
      if (bird.onGround()) {
        status = DEAD;
      }
      break;
    default:
  }
  document.title = "Flappy " + (int(frameRate()) + " fps");
  if (score > bestScore) {
    bestScore = score;
  }
}

function act() {
  if ((status == PLAYING || status == MENU) && bird.pos.y > 0) {
    bird.lift();
    status = PLAYING;
  }
  if (status == DEAD) {
    reset();
  }
}

function keyPressed() {
  if (key == ' ' || keyCode == UP_ARROW)
    act();
}

function mousePressed() {
  act();
}