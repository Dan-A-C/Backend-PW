'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Producto extends Model {
    static associate(models) {
      Producto.belongsToMany(models.Pedido, { through: 'Pedidos_Productos', foreignKey: 'productoId' });
    }
  }

  Producto.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    series: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    features: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  });

  return Producto;
};
