const express = require('express');
const cors = require('cors');
const err = require('./middlewares/err/');
const path = require('path');

// initialz
const app = express();
const routes = require('./routers/index.routes');
// const err_404 = require('./middlewares/error/404');

// db
require('./db/');

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(express.json());

// Routes
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static(path.resolve(__dirname, 'public/dist')));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public/dist') + '/index.html');
});

routes(app);

// errors
// app.use(err);

// init server
app.listen(app.get('port'), () => {
	// console.clear();

	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});
