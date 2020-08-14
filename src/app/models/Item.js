import Sequelize, { Model } from 'sequelize';

class Item extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        value: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Item;
