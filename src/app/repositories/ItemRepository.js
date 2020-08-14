import Item from '../models/Item';

class ItemRepository {
  constructor() {
    this.Item = Item;
  }

  async store({ name, value }) {
    return this.Item.create({ name, value });
  }

  async findByName(name) {
    return this.Item.findOne({ name });
  }
}

export default new ItemRepository();
