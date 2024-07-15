'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Pedido, { foreignKey: 'clienteId' });
    }
  }

  Cliente.init({
    nombre: DataTypes.STRING,
    usuario: DataTypes.STRING,
    correo: DataTypes.STRING,
    contra: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes'
  });

  return Cliente;
};
