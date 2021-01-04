// middlewares
const error = require('../middlewares/err/');
const valid_data = require('../middlewares/data/');
// modules with config
const Token = require('../configs/token');
const fs = require('fs').promises;
const path = require('path');

const { Products, Sections, Products_Sections } = require('../db/');

const create = async (req, res) => {
	try {
		// valid data
		const valid_body = await valid_data(req, 'product');
		if (!valid_body) throw { message: `Su furmulario debe contener campos vacios o escasos`, code: 400 };

		// define token
		const { token } = req.headers;

		// vlaid token
		const valid_token = await Token.valid(token);

		// vars
		const id_user = valid_token.id;
		const { name, price, desc, sects } = req.body;

		const URL = process.env.PORT || 'http://localhost:5000';
		const { filename } = req.file;
		const path = URL + '/uploads/' + filename;
		const ids = sects.split(',');

		// proces
		const product = await Products.create({ id_user, name, price, desc, path });

		const id_product = product.dataValues.id;
		ids.shift();

		const relation_n_N = ids.map((id, i) => ({ id_section: parseInt(id), id_product }));

		relation_n_N.forEach(async (dat) => await Products_Sections.create(dat));

		// query for get the products, in relation of the section
		const querys_section = ids.map(async (id, i) => {
			const resp_sections = await Sections.findAll({ where: { id: parseInt(id) } });

			return resp_sections[0].dataValues;
		});

		const sections = await Promise.all(querys_section);

		const info = { ...product.dataValues, sections };

		// resp
		res.status(200).json({ state: true, message: 'create OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

const destroy = async (req, res) => {
	try {
		// define token
		const { token } = req.headers;

		// valid token
		await Token.valid(token);

		// vars
		const { id } = req.params;

		// proces
		const product = await Products.findAll({ where: { id } });

		const path_query = product[0].dataValues.path;
		const path_img = path.resolve('src', product[0].dataValues.path.replace('http://localhost:5000/', ''));

		const valid_img = await Products.findAll({ where: { path: path_query } });
		if (valid_img.length === 1) await fs.unlink(path_img);

		const products = await Products.destroy({ where: { id } });

		const info = [];
		for (const key in products) info.push(products[key].dataValues);

		// resp
		res.status(200).json({ state: true, message: 'create OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

const bring = async (req, res) => {
	try {
		// querys SELECT db
		const resp_products = await Products.findAll();

		// filter sections
		const products = [];
		for (const key in resp_products) products.push(resp_products[key].dataValues);

		// create info too the response
		const querys_info = products.map(async (product) => {
			// query of relation
			const id_product = product.id;
			const resp_relations = await Products_Sections.findAll({ where: { id_product } });

			// filter relations
			const relations = [];
			for (const key in resp_relations) relations.push(resp_relations[key].dataValues);

			// query for get the products, in relation of the section
			const querys_section = relations.map(async (item_section) => {
				const id = item_section.id_section;
				const resp_sections = await Sections.findAll({ where: { id } });

				return resp_sections[0].dataValues;
			});

			// stop for promises
			const sections = await Promise.all(querys_section);

			return { ...product, sections };
		});

		const info = await Promise.all(querys_info);

		res.status(200).json({ state: true, message: 'GET OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

const edit = async (req, res) => {
	try {
		// define an valid Token
		const { token } = req.headers;
		await Token.valid(token);

		// define vars
		const { name, price } = req.body;
		const { id } = req.params;

		// query for update table
		const products = await Products.update({ name, price }, { where: { id } });

		// format the info
		const info = [];
		for (const key in products) info.push(products[key].dataValues);

		// resp
		res.status(200).json({ state: true, message: 'GET OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

module.exports = { create, bring, destroy, edit };
