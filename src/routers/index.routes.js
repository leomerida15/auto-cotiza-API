const product_routes = require('./products.routes');
const sections_routes = require('./sections.routes');
const users_routes = require('./users.routes');
const upload = require('../configs/multer');

// Add routes
module.exports = (app) => {
	app.use(users_routes);
	app.use(product_routes);
	app.use(sections_routes);
};
