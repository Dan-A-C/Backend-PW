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
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categoria',
        key: 'id'
      }
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
    Producto.belongsTo(models.Categoria, {
      foreignKey: 'categoriaId',
      as: 'categoria'
    });
  };
  return Producto;
};
