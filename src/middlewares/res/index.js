module.exports = (req, res, next) => {
	console.clear();
	const obj = { path: req.path, method: req.method };
	console.table([obj]);
	next();
};
