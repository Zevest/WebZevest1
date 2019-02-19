class Pipe {
  constructor(l, s, h) {
    this.spacing = 25;
    this.speed = s;
    this.h = random(1.5 * this.spacing, h - (this.spacing * 1.5));
    this.top = this.h - this.spacing;
    this.bottom = this.h + this.spacing;
    this.w = 28;
    this.x = 180;
    this.upPipe;
    this.downPipe;
    this.passed = false;
  }
  update() {
    this.x -= this.speed;
    if (!this.passed && this.x + this.w < bird.pos.x) {
      score += 1;
      pointSound.play();
      this.passed = true;
    }
  }
  setList(l) {
    this.parent = l;
  }


  display(img) {
    img[0].display(this.x, this.top - img[0].h);
    img[1].display(this.x, this.bottom);
  }
}