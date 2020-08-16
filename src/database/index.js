import Sequelize from 'sequelize';

import Survivor from '../app/models/Survivor';
import ItemSurvivor from '../app/models/ItemSurvivor';
import Item from '../app/models/Item';
import Infected from '../app/models/Infected';

import databaseConfig from '../config/database';

const models = [Survivor, Item, ItemSurvivor, Infected];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
