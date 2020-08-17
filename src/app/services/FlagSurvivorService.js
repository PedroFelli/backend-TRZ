import InfectedRepository from '../repositories/InfectedRepository';
import ItemSurvivorRepository from '../repositories/ItemSurvivorRepository';
import Infected from '../models/Infected';

class FlagSurvivorService {
  constructor(
    infectedRepository = InfectedRepository,
    itemSurvivorRepository = ItemSurvivorRepository
  ) {
    this.infectedRepository = infectedRepository;
    this.itemSurvivorRepository = itemSurvivorRepository;
  }

  async execute({ survivor_id, infected_id }) {
    const checkReport = await this.infectedRepository.findBySurvivorId({
      survivor_id,
      infected_id,
    });

    if (checkReport) {
      throw Error('You alredy report this survivor!');
    }

    const { count } = await this.infectedRepository.countReportFlag({
      infected_id,
    });

    if (count === 5) {
      throw Error('This survivor is already infected.');
    }

    if (count === 4) {
      //  change owner items
      const survivorItems = await this.itemSurvivorRepository.findSurvivorItems(
        survivor_id
      );

      const infectedItems = await this.itemSurvivorRepository.findSurvivorItems(
        infected_id
      );

      await Promise.all(
        survivorItems.map(async (item) => {
          //  new quantity for the 5° survivor
          const newQuantity = await this.itemSurvivorRepository.findById(
            item.id
          );
          newQuantity.quantity =
            infectedItems[item.item_id - 1].quantity + item.quantity;
          await newQuantity.save();
          //  set 0 quantity for the infected
          const infectedNewItems = await this.itemSurvivorRepository.findById(
            infectedItems[item.item_id - 1].id
          );
          infectedNewItems.quantity = 0;
          await infectedNewItems.save();
        })
      );
    }

    await this.infectedRepository.store({
      survivor_id,
      infected_id,
    });
  }
}

export default new FlagSurvivorService();
