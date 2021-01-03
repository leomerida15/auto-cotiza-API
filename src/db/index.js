const { Sequelize, DataTypes } = require('sequelize');

const init_models = require('./models/');
const keys = require('./keys/');
const pre_into = require('./contents');

const db_name = process.env.db_name || 'auto-gestion';
const db_dialect = process.env.sql_run || 'postgres';
const db_pass = process.env.db_pass || '123456';
const db_host = process.env.sql_run || 'localhost';

// conet with database
const config = () => new Sequelize(db_name, db_dialect, db_pass, { host: db_host, dialect: db_dialect });

const sequelize = config();

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
