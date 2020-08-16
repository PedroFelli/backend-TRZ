import Sequelize, { Model } from 'sequelize';
import { uuid } from 'uuidv4';

class Survivor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: Sequelize.UUID, primaryKey: true },
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        gender: Sequelize.STRING,
        lonlat: Sequelize.GEOGRAPHY(),
        infected: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeCreate', async (survivor) => {
      // eslint-disable-next-line no-param-reassign
      survivor.id = uuid();
    });
    return this;
  }

  // static associate(models) {
  //   this.hasMany(models.ItemSurvivor, { foreignKey: 'survivor_id' });
  // }
}

export default Survivor;
