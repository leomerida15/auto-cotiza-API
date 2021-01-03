module.exports = (model) => {
	const { Sections, Products, Users, Products_Sections } = model;
	// usuarios at Roles_has_usuarios
	Sections.hasMany(Products_Sections, { foreignKey: 'id_section' });
	Products.hasMany(Products_Sections, { foreignKey: 'id_product' });
	//
	Users.hasMany(Sections, { foreignKey: 'id_user' });
	Users.hasMany(Products, { foreignKey: 'id_user' });
};
