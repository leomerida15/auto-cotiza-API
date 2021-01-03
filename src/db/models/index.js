const users = require('./users');
//
const products = require('./products');
const sections = require('./sections');
//
const products_sections = require('./products_sections');

module.exports = (Sequelize, DataTypes) => {
	return {
		Users: users(Sequelize, DataTypes),
		Products: products(Sequelize, DataTypes),
		Sections: sections(Sequelize, DataTypes),
		Products_Sections: products_sections(Sequelize, DataTypes),
	};
};
