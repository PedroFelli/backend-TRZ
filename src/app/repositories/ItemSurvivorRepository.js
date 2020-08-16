import ItemSurvivor from '../models/ItemSurvivor';
import Item from '../models/Item';

class ItemSurvivorRepository {
  constructor() {
    this.itemSurvivor = ItemSurvivor;
  }

  async update({ id, item_id, quantity, survivor_id }) {
    this.itemSurvivor.update({ id, item_id, quantity, survivor_id });
  }

  async findById(id) {
    return this.itemSurvivor.findOne({ where: { id } });
  }

  async store({ item_id, quantity, survivor_id }) {
    return this.itemSurvivor.create({ item_id, quantity, survivor_id });
  }

  async findSurvivorItems(survivor_id) {
    return this.itemSurvivor.findAll({ where: { survivor_id } });
  }

  async findSurvivorItemsWithItemName(survivor_id) {
    return this.itemSurvivor.findAll({
      where: {
        survivor_id,
      },
      attributes: ['quantity'],
      include: [{ model: Item, attributes: ['name', 'value'] }],
    });
  }
}

export default new ItemSurvivorRepository();
