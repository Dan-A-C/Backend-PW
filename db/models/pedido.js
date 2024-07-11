'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.belongsTo(models.Cliente, { foreignKey: 'clienteId' }); 
      Pedido.belongsToMany(models.Producto, { through: 'Pedidos_Productos', foreignKey: 'pedidoId' }); 
    }
  }

  Pedido.init({
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Pedido',
  });

  return Pedido;
};
