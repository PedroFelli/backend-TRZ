import Survivor from '../models/Survivor';

class SurvivorRepository {
  constructor() {
    this.Survivor = Survivor;
  }

  async store({ name, age, gender, latitude, longitude }) {
    return this.Survivor.create({ name, age, gender, latitude, longitude });
  }

  async findByName(name) {
    return this.Survivor.findOne({ name });
  }
}

export default new SurvivorRepository();
