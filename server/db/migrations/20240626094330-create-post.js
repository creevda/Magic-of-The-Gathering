'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      city_owner: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      frazzle: {
        type: Sequelize.STRING,
      },
      sold: {
        type: Sequelize.BOOLEAN,
      },
      serialId: {
        type: Sequelize.STRING,
      },
      rarity: {
        type: Sequelize.STRING,
      },
      artist: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      setName: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};