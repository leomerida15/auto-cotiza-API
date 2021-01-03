module.exports = (model) => {
	// usuarios at Roles_has_usuarios
	model.WN_roles_usuarios.hasOne(model.Roles_has_usuarios, { foreignKey: 'id_rol' });
	// id_objeto
	// model.WN_objetos.hasOne(model.WN_usuarios, { foreignKey: 'id_objeto' });
	// model.Cat_tipo_objetos.hasOne(model.WN_objetos, { foreignKey: 'id_tipo_objeto' });
	// // productos
	// model.WN_objetos.hasOne(model.WN_productos, { foreignKey: 'id_objeto' });
};
