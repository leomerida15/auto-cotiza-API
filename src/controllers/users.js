// DataBse
const { Users } = require('../db/index');
// middlewares
const error = require('../middlewares/err/');
const valid_data = require('../middlewares/data/');

// modules with pre config
const Token = require('../configs/token');
const encryptor = require('../configs/encryptor');

const register = async (req, res) => {
	try {
		// valid data
		const valid_body = await valid_data(req, 'auth');
		if (!valid_body) throw { message: `Su furmulario debe contener campos vacios o escasos`, code: 400 };

		// valid password
		const { re_password } = req.body;
		if (req.body.password != re_password) throw { message: `El password y su validacion son diferentes`, code: 400 };

		// encrypt password
		req.body.password = await encryptor.encrypt(req.body.password);

		// define data
		const { email, password } = req.body;

		// INTO in the DB
		await Users.create({ email, password });

		// resp
		res.status(200).json({ state: true, message: 'GET OK' });
	} catch (err) {
		error(req, res, err);
	}
};

const login = async (req, res) => {
	try {
		// valid data
		const valid_body = await valid_data(req, 'auth');
		if (!valid_body) throw { message: `Su furmulario debe contener campos vacios o escasos`, code: 400 };

		// define data
		const { email, password } = req.body;

		// query SELECT
		const user = await Users.findAll({ where: { email } });
		if (user.length < 1) throw { message: `Usuario no Registrado`, code: 400 };

		// valid password with bcryt
		const valid_password = await encryptor.match(password, user[0].dataValues.password);
		if (!valid_password) throw { message: `El password no coinside`, code: 400 };

		// filter respues
		const data = user[0].dataValues;

		// token
		const token = await Token.generate(data.id, data.email);

		// resp
		res.status(200).json({ state: true, message: 'GET OK', info: { token } });
	} catch (err) {
		error(req, res, err);
	}
};

const social = async (req, res) => {
	try {
		// valid data
		const valid_body = await valid_data(req, 'social');
		if (!valid_body) throw { message: `Su furmulario debe contener campos vacios o escasos`, code: 400 };

		// define vars
		const { isNewUser, email } = req.body;

		const user = isNewUser ? await Users.create({ email, password: '12345' }) : await Users.findAll({ where: { email } });

		console.log(`.
		. 
		.    <<( ~ )>>
		. 
		. `);
		console.log('user ())>>==--<<:|:>>--==<<()');
		console.log(user);
		console.log(user[0].dataValues);
		console.log('id ())>>==--<<:|:>>--==<<()');
		console.log(user[0].dataValues.id);
		console.log('email ())>>==--<<:|:>>--==<<()');
		console.log(user[0].dataValues.email);

		// filter respues
		const data = isNewUser ? user.dataValues : user[0].dataValues;

		console.log('data ())>>==--<<:|:>>--==<<()');
		console.log(data);

		// token
		const token = await Token.generate(data.id, data.email);

		// resp
		res.status(200).json({ state: true, message: 'GET OK', info: { token } });
	} catch (err) {
		error(req, res, err);
	}
};

module.exports = { register, login, social };
