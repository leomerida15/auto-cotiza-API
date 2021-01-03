// middlewares
const error = require('../middlewares/err/');
const valid_data = require('../middlewares/data/');
// modules with config
const Token = require('../configs/token');

const { Sections, Products, Products_Sections } = require('../db/');

const create = async (req, res) => {
	try {
		// valid data
		const valid_body = await valid_data(req, 'section');
		if (!valid_body) throw { message: `Su furmulario debe contener campos vacios o escasos`, code: 400 };

		// define token
		const { token } = req.headers;
		const valid_token = await Token.valid(token);

		// vars
		const { id } = valid_token;
		const { name, price } = req.body;
		const data = { id_user: id, name, price };

		// proces
		const sections = await Sections.create(data);

		// filter info
		const info = sections.dataValues;

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
		const sections = await Sections.destroy({ where: { id } });

		const info = [];
		for (const key in sections) info.push(sections[key].dataValues);

		// resp
		res.status(200).json({ state: true, message: 'create OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

const bring = async (req, res) => {
	try {
		// querys too db
		const resp_sections = await Sections.findAll();

		// filter sections
		const sections = [];
		for (const key in resp_sections) sections.push(resp_sections[key].dataValues);

		// create info too the response
		const querys_info = sections.map(async (section) => {
			// query of relation
			const id_section = section.id;
			const resp_relations = await Products_Sections.findAll({ where: { id_section } });

			// filter relations
			const relations = [];
			for (const key in resp_relations) relations.push(resp_relations[key].dataValues);

			// query for get the products, in relation of the section
			const querys_products = relations.map(async (item_product) => {
				const id = item_product.id_product;
				const resp_products = await Products.findAll({ where: { id } });

				return resp_products[0].dataValues;
			});

			// stop for promises
			const products = await Promise.all(querys_products);

			return { ...section, products };
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
		const sections = await Sections.update({ name, price }, { where: { id } });

		// format the info
		const info = [];
		for (const key in sections) info.push(sections[key].dataValues);

		// resp
		res.status(200).json({ state: true, message: 'GET OK', info });
	} catch (err) {
		// err
		error(req, res, err);
	}
};

module.exports = { create, bring, destroy, edit };
