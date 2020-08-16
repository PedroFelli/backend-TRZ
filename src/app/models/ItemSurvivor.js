import Sequelize, { Model } from 'sequelize';

class ItemSurvivor extends Model {
  static init(sequelize) {
    super.init(
      {
        survivor_id: Sequelize.UUID,
        item_id: Sequelize.INTEGER,
        quantity: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'items_survivors',
      }
    );
  }

  static associate(models) {
    // this.hasMany(models.Survivor, { foreignKey: 'id' });
    this.belongsTo(models.Item, { foreignKey: 'item_id' });
  }
}

export default ItemSurvivor;
