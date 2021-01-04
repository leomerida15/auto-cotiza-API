const express = require('express');
const cors = require('cors');
const err_404 = require('./middlewares/err/err_404');
const cash = require('./middlewares/res/');

const path = require('path');

// initialz
const app = express();
const routes = require('./routers/index.routes');
app.use(cors('*'));

// db
require('./db/');

// Settings
app.set('port', process.env.PORT || 5000);

// Middlewares
app.use(express.json());

// Routes
// app.use('*', cash);

app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(express.static(path.resolve(__dirname, 'public/dist')));

routes(app);
app.use(function (req, res) {
	res.sendFile(path.resolve(__dirname, 'public/dist') + '/index.html');
});

// errors
app.use(err_404);

// init server
app.listen(app.get('port'), () => {
	console.log('                                                                  ()_()');
	console.log(`app corriendo en el puerto http://localhost:${app.get('port')} leoM             (o.o)`);
	console.log('                                                                  (|_|)*');
});
