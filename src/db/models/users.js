module.exports = (sequelize, type) => {
	const { INTEGER, STRING } = type;

	const users = sequelize.define(
		'users',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			email: { type: STRING },
			password: { type: STRING },
		},
		{ freezeTableName: true, timestamps: false }
	);

	return users;
};
