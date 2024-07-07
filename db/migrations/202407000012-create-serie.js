'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Series', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      temporada: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      productos: {
        type: Sequelize.JSON // O el tipo de datos que corresponda para almacenar la lista de productos
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Series');
  }
};
