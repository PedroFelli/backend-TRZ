import Sequelize, { Model } from 'sequelize';

class Infected extends Model {
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

export default Infected;
