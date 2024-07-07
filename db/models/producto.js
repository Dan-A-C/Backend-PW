'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class producto extends Model {
    static associate(models) {
      producto.belongsToMany(models.pedido, { through: 'Pedidos_Productos', foreignKey: 'productoId' });
    }
  }
  producto.init({
    nombre: DataTypes.STRING,
    marca: DataTypes.STRING,
    serie: DataTypes.STRING,
    precio: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'producto',
  });
  return producto;
};
