module.exports = [
	{ key: 'name' },
	{ key: 'price', valid: (item) => (item.length > 0 ? true : false) },
	{ key: 'desc' },
	{ key: 'sects' },
];
