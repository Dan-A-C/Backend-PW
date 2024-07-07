'use strict';
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    precio: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    stock: {
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
    tableName: 'producto'
  });
  Producto.associate = function(models) {
    Producto.hasMany(models.Pedido, {
      foreignKey: 'productoId',
      as: 'pedidos'
    });
    Producto.hasMany(models.Inventario, {
      foreignKey: 'productoId',
      as: 'inventarios'
    });
  };
  return Producto;
};
