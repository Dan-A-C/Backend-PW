'use strict';
module.exports = (sequelize, DataTypes) => {
  const Serie = sequelize.define('Serie', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    temporada: DataTypes.STRING,
    genero: DataTypes.STRING,
    imagen: DataTypes.STRING,
    productos: DataTypes.JSON
  }, {});
  Serie.associate = function(models) {
    // Asociaciones pueden definirse aquí
  };
  return Serie;
};
