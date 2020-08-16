import Infected from '../models/Infected';

class InfectedRepository {
  constructor() {
    this.Infected = Infected;
  }

  async store({ survivor_id, infected_id }) {
    return this.Infected.create({ survivor_id, infected_id });
  }

  async findBySurvivorId(survivor_id) {
    return this.Infected.findOne({ where: { survivor_id } });
  }

  async countReportFlag({ infected_id }) {
    return this.Infected.findAndCountAll({ where: { infected_id } });
  }
}

export default new InfectedRepository();
