'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pedido.belongsTo(models.Cliente, { foreignKey: 'clienteId' });
      pedido.belongsToMany(models.Producto, { through: 'Pedidos_Productos', foreignKey: 'pedidoId' });
    }
  }
  pedido.init({
    dirreccion: DataTypes.STRING,
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