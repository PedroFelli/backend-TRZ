import Survivor from '../models/Survivor';

class SurvivorRepository {
  constructor() {
    this.Survivor = Survivor;
  }

  async store({ name, age, gender, latitude, longitude }) {
    const lonlat = { type: 'Point', coordinates: [longitude, latitude] };

    return this.Survivor.create({ name, age, gender, lonlat });
  }

  async findAll() {
    return this.Survivor.findAll();
  }

  async findByName(name) {
    return this.Survivor.findOne({ where: { name } });
  }

  async findById(id) {
    return this.Survivor.findByPk(id);
  }
}

export default new SurvivorRepository();
