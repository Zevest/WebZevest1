/* global Matrix */
class NeuralNetWork {
  constructor(inputsLayers, hiddensLayers, outputsLayers) {
    if (inputsLayers instanceof NeuralNetWork) {
      let a = inputsLayers;
      this.inputSize = a.inputSize;
      this.hiddenSize = a.this.hiddenSize;
      this.outputSize = a.outputSize;
      this.learningRate = a.learningRate;

      his.wih = a.wih;
      this.who = a.who;

      this.biasO = a.biasO;
      this.biasH = a.biasH
    } else {
      this.inputSize = inputsLayers;
      this.hiddenSize = hiddensLayers;
      this.outputSize = outputsLayers;

      /*
      Matrix (Column, Rows):
      Weitght Matrix
      - Columns must match number of neurons in previous layer
      - Rows must match number of neuron in the next layers
      */
      this.wih = new Matrix(this.inputSize, this.hiddenSize);
      this.wih.randomize()
      this.who = new Matrix(this.hiddenSize, this.outputSize);
      this.who.randomize();
      this.biasH = Matrix.fullOf(0.1, 1, this.hiddenSize);
      this.biasO = Matrix.fullOf(0.1, 1, this.outputSize);
    }
    this.setLearningRate();
  }

  setLearningRate(i = 0.1) {
    this.learningRate = i;
  }

  copy() {
    return new NeuralNetWork(this);
  }
  twick(val) {
    if (random(1) < 0.1) {
      return val + random(randomGaussian(0, 0.1));
    }
    return val;
  }
  mutate() {
    //let f = (val => random() < rate ? val + randomGaussian(0, this.learningRate) : val);
    this.wih = Matrix.map(this.wih, this.twick);
    this.who = Matrix.map(this.who, this.twick);
    this.biasH = Matrix.map(this.biasH, this.twick);
    this.biasO = Matrix.map(this.biasO, this.twick);
  }

  guess(arr) {
    let inputs = Matrix.fromArray(arr);
    let hidden = Matrix.mult(inputs, this.wih);
    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let outputs = Matrix.mult(hidden, this.who);
    outputs.add(this.biasO);
    outputs.map(sigmoid);
    return outputs.toArray();
  }

  train(inputArr, targets) {
    /*
    error h1 = (wh11 / sum(wh1n)) * e1 + (w21/sum(wh2n)) * e2 + ...
    error h2 = (wh12 / sum(wh1n)) * e1 + (w22/sum(wh2n)) * e2 + ...
    simplification:
    error h1 = wh11 * e1 + w21 * e2 + ... + whi1 * ek
    error h2 = wh12 * e1 + w22 * e2 + ... + whi2 * ek
    ..... ..   ....   ...  ...   ..   ...   ....   ..
    error hn = wh1n * e1 + w2n * e2 + ... + whin * ek
    */
    // ---------- Feed Forward  --------------
    let inputs = Matrix.fromArray(inputArr);
    let hidden = Matrix.mult(inputs, this.wih);

    hidden.add(this.biasH);
    hidden.map(sigmoid);
    let outputs = Matrix.mult(hidden, this.who);
    outputs.add(this.biasO);
    outputs.map(sigmoid);

    // ---------- Back Propagation ----------
    let t = Matrix.fromArray(targets);
    let eo = Matrix.sub(t, outputs);
    // Calculate gradient
    let gradient = Matrix.map(outputs, dsigmoid);
    gradient.scalar(eo);
    gradient.scalar(this.learningRate);

    // TODO: add loop for multiple hidden layers
    // Calculate Deltas
    let hiddenT = Matrix.transpose(hidden);
    let whoDelta = Matrix.mult(hiddenT, gradient);
    // Adjust output's weight by deltas
    this.who.add(whoDelta);
    // Adjust the bias by its deltas
    this.biasO.add(gradient);
    // Calculate hidden layer errors
    let whoT = Matrix.transpose(this.who);
    let eh = Matrix.mult(eo, whoT);
    // Calculate hidden gradient
    let gradientH = Matrix.map(hidden, dsigmoid);
    gradientH.scalar(eh);
    gradientH.scalar(this.learningRate);
    // Calculate hidden deltas
    let inputsT = Matrix.transpose(inputs);
    let wihDelta = Matrix.mult(inputsT, gradientH);
    // Ajuste hidden's weight by deltas
    this.wih.add(wihDelta);
    // Adjust the bias by its deltas
    this.biasH.add(gradientH);
  }
}

function step(z) {
  return z >= 0.5 ? 1 : 0;
}

function sigmoid(z) {
  return 1 / (1 + Math.pow(Math.E, -z));
}

function dsigmoid(z) {
  // return sigmoid(z)*(1-sigmoid(z));
  return z * (1 - z);
}