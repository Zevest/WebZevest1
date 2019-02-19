function play() {
  updateBg();
  bird.update();
  displayBg();
  displayScore()
  bird.display();
}

function displayScore() {
  let scoreFont = FlappyNum.numToArray(score, font);
  FlappyNum.display(scoreFont, width / SCALE / 2, height / SCALE / 4);
}

function updateBg() {
  bg.update();
  floor.update();
  for (let i = pipes.length - 1; i > 0; i--) {
    pipes[i].update();
    if (pipes[i].x < -pipes[i].w)
      pipes.shift();
  }
}

function displayBg() {
  bg.display(0, 0);
  bg.display(bg.w, 0);
  bg.display(2 * bg.w, 0);
  for (let i = pipes.length - 1; i > 0; i--) {
    pipes[i].display(pipeImg);
  }
  floor.display(0, height / SCALE - floor.h);
  floor.display(floor.w - 12, height / SCALE - floor.h);
  floor.display(2 * (floor.w - 12), height / SCALE - floor.h);
}

function wait() {
  updateBg();
  bird.swing();
  displayBg();
  bird.display();
  title.display(width / SCALE / 4, height / SCALE / 6);
  tap.display(width / SCALE / 3, height / SCALE / 3);
}

function dead() {
  displayBg();
  bird.display();
  displayScore()
}

function fall() {
  bird.update();
  displayBg();
  displayScore()
  bird.display();
}