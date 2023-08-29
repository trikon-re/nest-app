'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('employee', 'address2', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('employee', 'cv', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    return Promise.all([
      await queryInterface.removeColumn('employee', 'address2'),
      await queryInterface.removeColumn('employee', 'cv'),
    ]);
  },
};
