module.exports = (sequelize, type) => {
	const { INTEGER } = type;

	const products_sections = sequelize.define(
		'products_sections',
		{
			id_product: { type: INTEGER },
			id_section: { type: INTEGER },
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	);

	return products_sections;
};
