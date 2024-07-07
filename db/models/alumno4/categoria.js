'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'categorias',
    timestamps: true,
  });

  return Categoria;
};
