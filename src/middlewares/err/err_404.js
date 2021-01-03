module.exports = (req, res) => {
	console.clear();
	const obj = { status: false, message: 'Sorry the route no is valid  404', path: req.originalUrl, method: req.method };
	console.table([obj]);
	res.status(404).json(obj);
};
