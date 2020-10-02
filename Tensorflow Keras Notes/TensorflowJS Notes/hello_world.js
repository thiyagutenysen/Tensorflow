// https://deeplizard.com/learn/video/6_33ulFDuCg

// Tensorflow js runs client side that is browser.
// we can also run it in server side by downloading npm tensorflowjs module and
// const tf = require('@tensorflow/tfjs-node');
// https://www.tensorflow.org/js/guide/nodejs
// model memory should be less than 30mb and lightweight.

// step 1: Choose your model to deploy
// step 2: look into tfjs_converter.ipynb to convert the model into weight files and model.json file.
// step 3: download the created model files and place it in the appropriate directory of the web application
// step 4: look at index.html file and predict.js file to understand how the model is deployed.
// In this project I have deployed the model in client-side that is the model runs on browser

// this tutorial teaches how to deploy our own model created in python in javascript environment and get predictions.
// we have used CNN Models - Mobile Net and VGG 16.

// to run the project
// step 1: go to local-server folder in terminal
// step 2: run   ---   node server.js
// step 3: open chrome browser
// step 4: type localhost:3000 in address bar and refresh it.
// step 5: that's it, play around with the web app.
