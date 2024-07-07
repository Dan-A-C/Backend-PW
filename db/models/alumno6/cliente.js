'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
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
    tableName: 'cliente'
  });
  Cliente.associate = function(models) {
    // asociaciones pueden ser definidas aquí
  };
  return Cliente;
};
