// const ono_one = require('./one_one');
const one_N = require('./one_N');
module.exports = async (model) => {
	try {
		// ono_one(model);
		one_N(model);
	} catch (err) {
		console.error(err);
	}
};
