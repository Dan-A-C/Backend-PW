'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pedido extends Model {
    static associate(models) {
      pedido.belongsTo(models.cliente, { foreignKey: 'clienteId' }); // Asociación con cliente
      pedido.belongsToMany(models.producto, { through: 'Pedidos_Productos', foreignKey: 'pedidoId' }); // Relación muchos a muchos con producto
    }
  }
  
  pedido.init({
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING,
    cantidad: DataTypes.INTEGER,
    total: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'pedido',
  });

  return pedido;
};
