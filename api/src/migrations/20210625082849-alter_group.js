'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('groups', 'creatorId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('groups', 'creatorId')
  }
}
