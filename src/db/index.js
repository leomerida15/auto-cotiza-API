const { Sequelize, DataTypes } = require('sequelize');

const init_models = require('./models/');
const keys = require('./keys/');
const pre_into = require('./contents');

const DB_NAME = process.env.DB_NAME || 'auto-gestion';
const DB_DIALECT = 'postgres';
const DB_PASS = process.env.DB_PASS || '123456';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'postgres';

// conet with database
const web = () =>
	new Sequelize(DB_NAME, DB_USER, DB_PASS, {
		host: DB_HOST,
		dialect: DB_DIALECT,
		dialectOptions: { ssl: { rejectUnauthorized: false } },
	});

const local = () => new Sequelize(DB_NAME, DB_USER, DB_PASS, { host: DB_HOST, dialect: DB_DIALECT });

const sequelize = process.env.PORT ? web() : local();

// inits
const model = init_models(sequelize, DataTypes);

keys(model);

const force = false;
sequelize.sync({ force }).then((resp) => {
	if (resp) console.log('Init DB SUCCESS');
	else console.log('Init DB err');

	if (force) pre_into(model);
});

module.exports = model;
