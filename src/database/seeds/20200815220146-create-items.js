module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'items',
      [
        {
          id: 1,
          name: 'Fiji Water',
          value: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          name: 'Campbell Soup',
          value: 12,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 3,
          name: 'First Aid Pouch',
          value: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 4,
          name: 'AK47',
          value: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('items', null, {});
  },
};
