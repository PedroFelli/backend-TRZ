import Item from '../models/Item';

class ItemRepository {
  constructor() {
    this.Item = Item;
  }

  async store({ name, value }) {
    return this.Item.create({ name, value });
  }

  async findBySurvivorId(survivor_id) {
    return this.Item.findOne({ where: { survivor_id } });
  }
}

export default new ItemRepository();
