/* exported Matrix */
class Matrix {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.data = Array(this.col * this.row);
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = 0;
    }
  }

  get(y, x) {
    return this.data[y * this.col + x];
  }
  set(val, y, x) {
    this.data[y * this.col + x] = val;
  }

  getRow(y) {
    let t = y * this.col;
    return this.data.slice(t, t + this.col);
  }

  getCol(x) {
    let arr = [];
    if (x > this.col) {
      throw new Error('index out of bounds ');
    }
    for (let i = 0; i < this.row; i++) {
      arr.push(this.data[i * this.col + (x % this.col)]);
    }
    return arr;
  }

  randomize() {
    for (let i = 0; i < this.row * this.col; i++) {
      this.data[i] = Math.random() * 2 - 1;
    }
  }

  add(b) {
    for (let i = 0; i < this.row * this.col; i++) {
      this.data[i] += (b instanceof Matrix ? b.data[i] : b);
    }
  }

  sub(b) {
    for (let i = 0; i < this.row * this.col; i++) {
      this.data[i] -= (b instanceof Matrix ? b.data[i] : b);
    }
  }

  scalar(b) {
    for (let i = 0; i < this.row * this.col; i++) {
      this.data[i] *= (b instanceof Matrix ? b.data[i] : b);
    }
  }

  toArray() {
    return this.data;
  }

  map(f) {
    for (let i = 0; i < this.data.length; i++) {
      this.data[i] = f(this.data[i]);
    }
  }

  print() {
    let table = [];
    for (let j = 0; j < this.row; j++) {
      let row = [];
      for (let i = 0; i < this.col; i++) {
        row.push(this.get(j, i));
      }
      table.push(row);
    }
    console.table(table);
  }

  static map(mat, f) {
    let c = new Matrix(mat.row, mat.col);
    for (let i = 0; i < c.data.length; i++) {
      c.data[i] = f(mat.data[i]);
    }
    return c;
  }

  static toArray(mat) {
    return mat.data;
  }

  static fromArray(arr) {
    let c;
    try {
      c = new Matrix(arr.length, arr[0].length);
      for (let i = 0; i < c.row * c.col; i++) {
        let x = i % c.col;
        let y = Math.floor(i / c.col);
        if (arr[y][x] !== undefined) {
          c.set(arr[y][x], y, x);
        } else {
          throw new Error('Number of column and row must be constant');
        }
      }
    } catch (e) {
      c = new Matrix(1, arr.length);
      for (let i = 0; i < c.row * c.col; i++) {
        let x = i % c.col;
        let y = Math.floor(i / c.col);
        c.set(arr[i], y, x);
      }
    }
    return c;
  }
  //  Matrix multiplication
  static mult(a, b) {
    if (a.col !== b.row) {
      throw new Error('The Number of columns of the first matrix must match number of rows of the second matrix.');
    }
    let c = new Matrix(a.row, b.col);
    for (let j = 0; j < a.row; j++) {
      for (let i = 0; i < b.col; i++) {
        let sum = 0;
        for (let k = 0; k < a.col; k++) {
          // console.log('*',a.getRow(j)[k],b.getCol(i)[k]);
          sum += a.getRow(j)[k] * b.getCol(i)[k];
        }
        c.set(sum, j, i);
      }
    }
    return c;
  }

  static add(a, b) {
    let c = new Matrix(a.row, a.col);
    for (let i = 0; i < c.row * c.col; i++) {
      c.data[i] = a.data[i] + b.data[i];
    }
    return c;
  }

  static fullOf(a, h, w) {
    let c = new Matrix(h, w);
    for (let i = 0; i < c.row * c.col; i++) {
      c.data[i] = a;
    }
    return c;
  }

  static sub(a, b) {
    let c = new Matrix(a.row, a.col);
    for (let i = 0; i < c.row * c.col; i++) {
      c.data[i] = a.data[i] - b.data[i];
    }
    return c;
  }

  static scalar(a, b) {
    let c = new Matrix(a.row, a.col);
    for (let i = 0; i < c.row * c.col; i++) {
      c.data[i] = a.data[i] * (b instanceof Matrix ? b.data[i] : b);
    }
    return c;
  }

  static randomArray(w, h) {
    let c = new Matrix(w, h);
    for (let i = 0; i < c.row * c.col; i++) {
      c.data[i] = Math.random() * 2 - 1;
    }
    return c;
  }

  static transpose(a) {
    let b = new Matrix(a.col, a.row);
    for (let i = 0; i < b.row * b.col; i++) {
      let x = i % a.col;
      let y = Math.floor(i / a.col);
      let temp = a.get(y, x);
      b.set(temp, x, y);
    }
    return b;
  }
}
// let a = [[2,3,4],[1,0,0]];
// let b = [[0, 1000],[1, 100],[0, 10]];
// let a = [[3,4,2]];
// let b = [[13,9,7,15],[8,7,4,6],[6,4,0,3]]
// let aa = Matrix.fromArray(a);
// let bb = Matrix.fromArray(b);

// let d = Matrix.randomArray(5,2);
// let e = Matrix.randomArray(3,5);

// let f = Matrix.mult(d,e);

// let c = Matrix.mult(aa, bb);
// console.log(aa,bb);
// console.log(c);