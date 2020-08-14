import Sequelize from 'sequelize';

import Survivor from '../app/models/Survivor';
import Item from '../app/models/Item';

import databaseConfig from '../config/database';

const models = [Survivor, Item];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
