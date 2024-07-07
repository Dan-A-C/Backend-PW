'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    contrasena: DataTypes.STRING
  }, {});

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Pedido, {
      foreignKey: 'clienteId',
      as: 'pedidos'
    });
  };

  return Usuario;
};
