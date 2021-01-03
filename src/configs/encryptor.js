const bcrypt = require('bcrypt');

const encrypt = async (password) => {
	const salt = await bcrypt.genSalt(5);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

const match = async (password, savePassword) => {
	try {
		return await bcrypt.compare(password, savePassword);
	} catch (e) {
		return false;
	}
};

module.exports = { encrypt, match };
