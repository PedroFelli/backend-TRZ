import SurvivorRepository from '../repositories/SurvivorRepository';
import ItemSurvivorRepository from '../repositories/ItemSurvivorRepository';

class ListItemsSurvivor {
  constructor(
    itemSurvivorRepository = ItemSurvivorRepository,
    survivorRepository = SurvivorRepository
  ) {
    this.itemSurvivorRepository = itemSurvivorRepository;
    this.survivorRepository = survivorRepository;
  }

  async execute(survivor_id) {
    const findSurvivorName = await this.survivorRepository.findById(
      survivor_id
    );

    if (!findSurvivorName) {
      throw Error('Survivor not found');
    }

    const response = await this.itemSurvivorRepository.findSurvivorItemsWithItemName(
      survivor_id
    );

    return response;
  }
}

export default new ListItemsSurvivor();
