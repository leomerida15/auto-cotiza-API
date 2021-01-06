// middlewares
const error = require('../middlewares/err/');
const valid_data = require('../middlewares/data/');
// modules with config
const Token = require('../configs/token');
const cloud_up = require('../configs/cloudinary');
const fs = require('fs').promises;
const path = require('path');

const { Products, Sections, Products_Sections } = require('../db/');

const relations = async (req, res) => {
	try {
		const resp = await Products_Sections.findAll();

		const info = [];
		for (const key in resp) info.push(resp[key].dataValues);

		res.status(200).json({ state: true, message: 'create OK', info });
	} catch (err) {
		error(req, res, err);
	}
};

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

		// up in cloudinary
		const result = await cloud_up.upload(req.file.path);
		console.log(result);
		const { url, public_id } = result;
		await fs.unlink(req.file.path);

		// filter ids coverter the string to array and delete position 0
		const ids = sects.split(',');
		ids.shift();

		// proces
		const product = await Products.create({ id_user, name, price, desc, path: url, public_id });
		const id_product = product.dataValues.id;

		// Create array for the query at INTO in restriction table
		const relation_n_N = ids.map((id, i) => ({ id_section: parseInt(id), id_product }));
		// INTO in restiction table
		relation_n_N.forEach(async (data) => await Products_Sections.create(data));

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
		const products = await Products.destroy({ where: { id } });

		// Destroy Img in the cloud
		const { public_id } = product[0].dataValues;
		await cloud_up.destroy(public_id);

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

module.exports = { create, bring, destroy, edit, relations };
