module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const products = sequelize.define(
		'products',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_user: { type: INTEGER },
			name: { type: STRING(80) },
			price: { type: INTEGER },
			desc: { type: STRING(80) },
			path: { type: STRING(250) },
			public_id: { type: STRING(45) },
		},
		{ freezeTableName: true, timestamps: false }
	);

	return products;
};
