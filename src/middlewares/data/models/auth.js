module.exports = [
	{
		key: 'email',
		valid: (item) => ((item.indexOf('@') === -1 && item.lastIndexOf('.com') === -1) || !item ? false : true),
	},
	{ key: 'password', valid: (item) => (item.length >= 6 || item != '12345' ? true : false) },
];
