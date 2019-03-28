/* exported setup */
/* global NeuralNetWork, Matrix */

let trainingData = [{
	inputs: [1, 0],
	target: [1]
},
{
	inputs: [0, 1],
	target: [1]
},
{
	inputs: [0, 0],
	target: [0]
},
{
	inputs: [1, 1],
	target: [0]
}];
let nn;

function setup ()	{
	nn = new NeuralNetWork(2, 2, 1);
	nn.learningRate = 0.1;
	for (let i = 0; i < 50000; i++) {
		let data = random(trainingData);
		// console.log(data);
		nn.train(data.inputs, data.target);
	}
	console.log('Ready !');
	console.log(nn.guess([1, 1]));
	console.log(nn.guess([1, 0]));
	console.log(nn.guess([0, 1]));
	console.log(nn.guess([0, 0]));
}
