let express = require('express');
let app = express();

//Note that the calls to app.use() are only called once,
// and that’s when the server is started.
// The app.use() calls specify the middleware functions,
// and calls to those middleware functions will be executed each time a request comes in to the server.
// .use is called called whenever it is booted up and whenever any request is made

// middleware
// this logs the url in console
app.use(function (req, res, next) {
	console.log(`${new Date()} - ${req.method} request for ${req.url}`);
	next();
});

// middleware
// this serves whatever files on static folder
app.use(express.static('../static'));

// listen to the port
app.listen(3000, function () {
	console.log('Serving static on 3000');
});
