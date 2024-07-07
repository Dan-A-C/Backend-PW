'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define('Pedido', {
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DOUBLE,
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
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'id'
      }
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    tableName: 'pedido'
  });

  Pedido.associate = function(models) {
    Pedido.belongsTo(models.Usuario, {
      foreignKey: 'clienteId',
      as: 'usuario'
    });
    Pedido.belongsTo(models.Producto, {
      foreignKey: 'productoId',
      as: 'producto'
    });
  };

  return Pedido;
};
