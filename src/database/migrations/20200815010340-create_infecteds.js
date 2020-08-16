module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infecteds', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      survivor_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'survivors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      infected_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'survivors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('infecteds');
  },
};
