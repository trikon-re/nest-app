'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lead', 'created_by_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    });
    await queryInterface.addColumn('lead', 'updated_by_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    });
    await queryInterface.addColumn('lead', 'deleted_by_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('lead', 'created_by_id');
    await queryInterface.removeColumn('lead', 'updated_by_id');
    await queryInterface.removeColumn('lead', 'deleted_by_id');
  },
};
