import Sequelize, { Model } from 'sequelize';

class Survivor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        gender: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude: Sequelize.FLOAT,
        infected: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Survivor;
