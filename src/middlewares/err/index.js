const descript = require('./code');
module.exports = (req, res, err) => {
	if (req != 404) code = err.code ? err.code : 500;
	else {
		const obj = { status: false, message: 'Sorry the route no is valid  404', path: req.originalUrl, method: req.method };
		console.table([obj]);
		res.status(404).json(obj);
	}

	const message = typeof err === 'string' ? err : err.message;
	const code_descript = descript[code];

	const obj = { status: false, message, code, code_descript, path: req.originalUrl, method: req.method };

	if (obj.message.length < 80) console.table([obj]);
	else console.log(obj);

	res.status(code).json(obj);
};
