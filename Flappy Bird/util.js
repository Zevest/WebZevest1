class ImageCroped {
  constructor(img, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = 0;
    this.drawedContent = img.get(this.x, this.y, this.w, this.h);
  }
  display(x, y) {
    image(this.drawedContent, x - this.i, y);
  }
}

class DynamicImage extends ImageCroped {
  constructor(img, x, y, w, h) {
    super(img, x, y, w, h);
    this.i = 0;
    this.moveSpeed = 0.7;
  }
  update() {
    this.i = (this.i + this.moveSpeed) % this.w;
  }
}

const CARWIDTH = 12;
const CARHEIGHT = 20;
const SPACE = -2
const CARSPACE = 2;

class FlappyNum {
  static text(num) {

    let w = Math.ceil(Math.log10(num + 1));
    let arr = [];
    if (num == 0) {
      w = 1;
    }
    20;
    for (let i = 0; i < w; i++) {
      let numb = parseInt(num.toString().charAt(i));
      //console.log(numb)
      arr.push(FlappyNum.createNum(numb));
    }
    return arr;
    //FlappyNum.display(arr, x, y);
  }

  static display(arr, x, y) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i].display(x - CARWIDTH / 2 + sum, y - CARHEIGHT / 2);
      sum += arr[i].w + SPACE;
    }
  }
  static createNum(num) {
    // 293 160 10 16 /// 5 10
    //console.log(num);
    if (num > 1 && num < 10) {
      return new ImageCroped(img, 292 + ((num - 2) % 4) * (CARWIDTH + CARSPACE), 160 + Math.floor(((num - 2) / 4)) * (CARHEIGHT + 4), CARWIDTH, CARHEIGHT);
    } else if (num == 1) {
      return new ImageCroped(img, 136, 455, CARWIDTH - 4, CARHEIGHT);
    } else if (num == 0) {
      return new ImageCroped(img, 496, 60, CARWIDTH, CARHEIGHT);
    }
  }

  static makeFont() {
    let font = [];
    for (let i = 0; i < 10; i++) {
      font.push(FlappyNum.createNum(i));
    }
    return font;
  }

  static numToArray(num, arr) {
    let number = [];
    let w = Math.ceil(Math.log10(num + 1))
    if (num == 0) {
      w = 1;
    }
    for (let i = 0; i < w; i++) {
      let numb = parseInt(num.toString().charAt(i));
      number.push(arr[numb]);
    }
    return number;
  }

}


function closest(arr, x) {
  if (arr.length > 0) {
    let record = Infinity;
    let best = 0;
    for (let i = 0; i < pipes.length; i++) {
      let distance = (pipes[i].x - x)
      if (pipes[i].x + pipes[i].w > x && distance < record) {
        record = distance;
        best = i;
      }
    }
    return arr[best];
  }
}