import Survivor from '../models/Survivor';
import ItemSurvivor from '../models/ItemSurvivor';

class ItemController {
  async infecteds(req, res) {
    const total = await Survivor.count();

    const infecteds = await Survivor.findAndCountAll({
      where: { infected: true },
    });

    const percent = infecteds.count / total;

    const report = {
      description: 'Average of infected people',
      average_infected: percent,
    };

    return res.json({ report });
  }

  async noninfecteds(req, res) {
    const total = await Survivor.count();

    const healthy = await Survivor.findAndCountAll({
      where: { infected: false },
    });

    const percent = healthy.count / total;

    const report = {
      description: 'Average of non-infected (healthy) people',
      average_healthy: percent,
    };

    return res.json({ report });
  }

  async peopleinventory(req, res) {
    const totalItems = await ItemSurvivor.findAndCountAll({
      attributes: ['quantity'],
    });

    const sumItems = totalItems.rows.reduce((cumulative, item) => {
      return cumulative + item.quantity;
    }, 0);

    const healthy = await Survivor.findAndCountAll({
      where: { infected: false },
    });

    const totalSurvivors = await Survivor.count();

    const totalWater = await ItemSurvivor.findAndCountAll({
      attributes: ['quantity'],
      where: { item_id: 1 },
    });

    const sumWater = totalWater.rows.reduce((cumulative, item) => {
      return cumulative + item.quantity;
    }, 0);

    const totalSoup = await ItemSurvivor.findAndCountAll({
      attributes: ['quantity'],
      where: { item_id: 2 },
    });

    const sumSoup = totalSoup.rows.reduce((cumulative, item) => {
      return cumulative + item.quantity;
    }, 0);

    const totalAK47 = await ItemSurvivor.findAndCountAll({
      attributes: ['quantity'],
      where: { item_id: 3 },
    });

    const sumAk47 = totalAK47.rows.reduce((cumulative, item) => {
      return cumulative + item.quantity;
    }, 0);

    const totalPouch = await ItemSurvivor.findAndCountAll({
      attributes: ['quantity'],
      where: { item_id: 4 },
    });

    const sumPouch = totalPouch.rows.reduce((cumulative, item) => {
      return cumulative + item.quantity;
    }, 0);

    const report = {
      description:
        'Average of the quantity of items per person (total and just non-infected) and of each item',
      average_items_quantity_per_person: sumItems / totalSurvivors,
      average_items_quantity_per_healthy_person: sumItems / healthy.count,
      average_quantity_of_each_item_per_person: {
        'Fiji Water': sumWater / totalSurvivors,
        'Campbell Soup': sumSoup / totalSurvivors,
        AK47: sumAk47 / totalSurvivors,
        'First Aid Pouch': sumPouch / totalSurvivors,
      },
    };

    return res.json({ report });
  }
}

export default new ItemController();
