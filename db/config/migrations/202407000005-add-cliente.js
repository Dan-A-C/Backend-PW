'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'pedidos', // nombre del modelo de origen
      'clienteId', // nombre de la clave que estamos agregando
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes', // nombre del modelo de destino
          key: 'id', // clave en el modelo de destino que estamos referenciando
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'pedidos', // nombre del modelo de origen
      'clienteId' // clave que queremos eliminar
    );
  }
};