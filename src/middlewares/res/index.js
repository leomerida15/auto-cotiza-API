module.exports = (req, res, next) => {
	console.clear();
	const obj = { path: req.originalUrl, method: req.method };
	console.table([obj]);
	next();
};
