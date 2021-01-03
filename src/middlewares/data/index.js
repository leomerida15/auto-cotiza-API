const models = require('./models/');

const valid_data = async (req, i) => {
	const { body } = req;
	// define the Keys of body
	const datos = Object.keys(body);

	// valid the data, i is the key of objet to valid
	const valid = models[i].filter((item) => {
		// define the Keys of model
		const reviews = Object.keys(item);

		// review if do existing the key valid, for use the funtion valid key
		let validate;
		if (body[item.key]) {
			validate = true;
			if (reviews.includes('valid') && item.valid(body[item.key])) validdate = true;
		}

		// responce the state of valid
		return !datos.includes(item.key) || !validate;
	});

	Promise.all(valid);

	const resp = valid.lenght > 0 ? false : true;
	return resp;
};

module.exports = valid_data;
