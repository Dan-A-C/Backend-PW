'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Pedido, { through: 'Pedidos_Productos', foreignKey: 'productoId' });
    }
  }

  Producto.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    series: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    features: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Producto',
  });

  return Producto;
};
