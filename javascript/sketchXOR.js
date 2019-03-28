/* exported setup */
/* global NeuralNetWork */

let trainningData = [{
    input: [1, 1],
    target: [0]
  },
  {
    input: [0, 0],
    target: [0]
  },
  {
    input: [0, 1],
    target: [1]
  },
  {
    input: [1, 0],
    target: [1]
  }
];
let brain;
let lrSlider;

function preload() {
  brain = new NeuralNetWork(2, 3, 1);
}

function setup() {
  createCanvas(500, 500);
  lrSlider = createSlider(0.01, 0.8, 0.1, 0.01);
  console.log('Ready !');
  noStroke();
}

function draw() {
  let offSet = 10;
  for (let i = 0; i < 500; i++) {
    let data = random(trainningData);
    brain.train(data.input, data.target);
  }
  brain.setLearningRate(lrSlider.value());
  for (let j = 0; j < height / offSet; j++) {
    for (let i = 0; i < width / offSet; i++) {
      fill(brain.guess([j / (height / offSet), i / (width / offSet)]) * 255);
      rect(i * offSet, j * offSet, offSet, offSet);
    }
  }
}