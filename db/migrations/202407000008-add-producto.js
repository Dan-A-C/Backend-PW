'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'pedido', 
      'productoId', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'productos', 
          key: 'id', 
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'pedido', 
      'productoId' 
    );
  }
};
