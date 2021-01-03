const express = require('express');
const cors = require('cors');
const err = require('./middlewares/err/');
const path = require('path');

// initialz
const app = express();
const routes = require('./routers/index.routes');
app.use(cors('*'));

console.log(1);

// db
require('./db/');

console.log(2);

// Settings
app.set('port', process.env.PORT || 5000);

console.log(3);

console.table([app.get('port')]);

// Middlewares
app.use(express.json());

console.log(4);

// Routes
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
// app.use(express.static(path.resolve(__dirname, 'public/dist')));

app.get('/', function (req, res) {
	// res.sendFile(path.resolve(__dirname, 'public/dist') + '/index.html');
	console.log(5);
});

console.log(6);

routes(app);

// errors
app.use(err(404));

// init server
app.listen(app.get('port'), () => {
	// console.clear();

	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});
