import Survivor from '../models/Survivor';

class SurvivorRepository {
  constructor() {
    this.Survivor = Survivor;
  }

  async update({ id, name, age, gender, latitude, longitude }) {
    const lonlat = { type: 'Point', coordinates: [longitude, latitude] };

    return this.Survivor.update(
      { name, age, gender, lonlat },
      { where: { id } }
    );
  }

  async updateStatus(id) {
    return this.Survivor.update({ infected: true }, { where: { id } });
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
