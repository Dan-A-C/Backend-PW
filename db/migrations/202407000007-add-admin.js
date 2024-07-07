'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('pedido');

    if (!tableDescription.clienteId) {
      await queryInterface.addColumn(
        'pedido',
        'clienteId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'clientes',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      );
    }

    if (!tableDescription.admin) {
      await queryInterface.addColumn(
        'pedido',
        'admin',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    const tableDescription = await queryInterface.describeTable('pedido');

    if (tableDescription.clienteId) {
      await queryInterface.removeColumn(
        'pedido',
        'clienteId'
      );
    }

    if (tableDescription.admin) {
      await queryInterface.removeColumn(
        'pedido',
        'admin'
      );
    }
  }
};
