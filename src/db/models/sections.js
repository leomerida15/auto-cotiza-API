module.exports = (sequelize, type) => {
	const { INTEGER, STRING, BOOLEAN } = type;

	const sections = sequelize.define(
		'sections',
		{
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			id_user: { type: INTEGER },
			name: { type: STRING(45) },
			price: { type: INTEGER },
		},
		{ freezeTableName: true, timestamps: false }
	);

	return sections;
};
