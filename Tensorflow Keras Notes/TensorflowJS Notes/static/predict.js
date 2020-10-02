// http://youmightnotneedjquery.com/

//import * as tf from '@tensorflow/tfjs';

const choose_btn = document.querySelector('#image-selector');
console.log(choose_btn);

choose_btn.addEventListener('change', (e) => {
	//console.log(e);
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		let show_image = document.querySelector('#selected-image');
		console.log(show_image);
		show_image.setAttribute('src', dataURL);
		let pred_list = document.querySelector('#prediction-list');
		while (pred_list.firstChild) {
			pred_list.removeChild(pred_list.firstChild);
		}
	};
	let file = choose_btn.files[0];
	reader.readAsDataURL(file);
	// when the above statement is completed, reader.onload is trigerred
});

// importing tf model
let model;
// we will wait and load the model and rotate the progress bar until its full loaded we will hide the process bar
(async function () {
	model = await tf.loadLayersModel(
		'http://localhost:3000/tfjs-models/MobileNet/model.json'
	);
	$('.progress-bar').hide();
})();

// we will now write logic when predict button is clicked
let predict_btn = document.querySelector('#predict-button');
predict_btn.addEventListener('click', async function () {
	let img = document.querySelector('#selected-image');
	let tensor = tf.browser
		.fromPixels(img)
		.resizeNearestNeighbor([224, 224])
		.toFloat();
	//.expandDims(); -- this line is used when we don't use preprocessing step

	// The below commented code is hardcoded preproccessing system for vgg 16
	// // prepare the image to input to vgg16
	// // these mean values are taken from the vgg16 research paper
	// let meanImageNetRGB = {
	// 	red: 123.68,
	// 	green: 116.779,
	// 	blue: 103.939,
	// };

	// // just initialise list of tensors
	// let indices = [
	// 	tf.tensor1d([0], 'int32'),
	// 	tf.tensor1d([1], 'int32'),
	// 	tf.tensor1d([2], 'int32'),
	// ];

	// // separate the color, subtract the mean value and expand dims from 224x224 to 50176
	// let centeredRGB = {
	// 	red: tf
	// 		.gather(tensor, indices[0], 2) // filter the values at column 0 by axis 2
	// 		.sub(tf.scalar(meanImageNetRGB.red)) // subtract the mean value
	// 		.reshape([50176]), // change dimensions
	// 	green: tf
	// 		.gather(tensor, indices[1], 2)
	// 		.sub(tf.scalar(meanImageNetRGB.green))
	// 		.reshape([50176]),
	// 	blue: tf
	// 		.gather(tensor, indices[2], 2)
	// 		.sub(tf.scalar(meanImageNetRGB.blue))
	// 		.reshape([50176]),
	// };
	// // this code stacks them as 224x224x3 the change RGB to BGR bcz that's what our model wants
	// // then again expand dimensions
	// let processedTensor = tf
	// 	.stack([centeredRGB.red, centeredRGB.green, centeredRGB.blue], 1)
	// 	.reshape([224, 224, 3])
	// 	.reverse(2) // reverse list along axis 2
	// 	.expandDims();

	// // concise vgg16 preprocessing unit
	// let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
	// processedTensor = tensor.sub(meanImageNetRGB).reverse(2).expandDims();

	// // concise our own scratch cnn model preprocessing unit
	// processedTensor = tensor.expandDims();

	// concise mobilenet preprocessing unit
	let offset = tf.scalar(127.5);
	processedTensor = tensor.sub(offset).div(offset).expandDims();

	// Predict the given image
	// data() on the predictions tensor,
	// which asynchronously loads the values from the tensor and returns a Promise of a TypedArray after the computation completes.
	// Notice the await and async keywords here that we discussed earlier.
	let predictions = await model.predict(processedTensor).data();
	// predictions array is going to be made up of 1000 elements,
	// each of which corresponds to the prediction probability for an individual ImageNet class.
	// Each index in the array maps to a specific ImageNet class.

	// we will take top 5 prdictions
	let top5 = Array.from(predictions)
		.map((p, i) => {
			return {
				probability: p,
				className: IMAGENET_CLASSES[i],
			};
		})
		.sort((a, b) => {
			return b.probability - a.probability;
		})
		.slice(0, 5);

	console.log(top5);

	// remove previous predictions
	let pred_list = document.querySelector('#prediction-list');
	while (pred_list.firstChild) {
		pred_list.removeChild(myNode.firstChild);
	}

	// add our top predictions to HTML file
	top5.forEach((p) => {
		pred_list.innerHTML += `<li>${p.className}: ${p.probability.toFixed(
			6
		)}</li>`;
	});
});
