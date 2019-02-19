let maxSpeed = 3.0;
let liftSpeed = 5;
let startPoint = 100

class Bird {
  constructor() {
    this.pos = {
      x: 40,
      y: startPoint
    };
    this.vel = 0;
    this.g = 0.15;
    this.i = 0;
    this.box = {
      w: 8,
      h: 6
    };
  }

  update() {
    this.vel += this.g;
    this.pos.y += this.vel;
    if (abs(this.vel) > maxSpeed) {
      this.vel = maxSpeed * sign(this.vel);
    }
  }

  lift() {
    this.vel -= liftSpeed;

  }
  display() {
    let angle = map(this.vel, -1, maxSpeed, -PI / 6, PI / 2)
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);
    birdFrame[Math.floor(frameCount / 5) % 3].display(-this.box.w - 1, -this.box.h - 1);
    pop();
  }
  swing() {
    this.pos.y = startPoint + sin(this.i) * 5;
    this.i += 0.1;
  }

  collide(p) {
    if (p !== undefined) {
      return (!(this.pos.x + this.box.w < p.x ||
          this.pos.x - this.box.w > p.x + p.w) &&
        (this.pos.y + this.box.h > p.bottom ||
          this.pos.y - this.box.h < p.top));
    }
  }

  onGround() {
    return (this.pos.y + this.box.h > height / SCALE - floor.h);
  }
}

function sign(x) {
  return x >= 0 ? 1 : -1;
}