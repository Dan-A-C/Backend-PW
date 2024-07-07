'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventario = sequelize.define('Inventario', {
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    creadoEn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    actualizadoEn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    tableName: 'inventario'
  });
  Inventario.associate = function(models) {
    Inventario.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto'
    });
  };
  return Inventario;
};
