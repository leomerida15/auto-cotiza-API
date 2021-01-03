module.exports = [
	{
		key: 'email',
		valid: (item) => ((item.indexOf('@') === -1 && item.lastIndexOf('.com') === -1) || !item ? false : true),
	},
	{ key: 'isNewUser' },
];
