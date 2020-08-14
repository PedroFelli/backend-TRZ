import SurvivorRepository from '../repositories/SurvivorRepository';
import ItemRepository from '../repositories/ItemRepository';

class CreateSurvivorService {
  async execute({ name, age, gender, latitude, longitude, item }) {
    const checkName = await SurvivorRepository.findByName(name);

    // if (checkName) {
    //   throw Error('Name alredy used!');
    // }

    const createdItem = await ItemRepository.store(item);

    const survivor = await SurvivorRepository.store({
      name,
      age,
      gender,
      latitude,
      longitude,
    });

    return { createdItem, survivor };
  }
}

export default new CreateSurvivorService();
