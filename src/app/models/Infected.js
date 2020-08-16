import Sequelize, { Model } from 'sequelize';

class ItemSurvivor extends Model {
  static init(sequelize) {
    super.init(
      {
        survivor_id: Sequelize.UUID,
        infected_id: Sequelize.UUID,
      },
      {
        sequelize,
        tableName: 'infecteds',
      }
    );
  }
}

export default ItemSurvivor;
