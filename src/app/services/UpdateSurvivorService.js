import SurvivorRepository from '../repositories/SurvivorRepository';
import Survivor from '../models/Survivor';

class UpdateSurvivorService {
  constructor(survivorRepository = SurvivorRepository) {
    this.survivorRepository = survivorRepository;
  }

  async execute({ id, name, age, gender, latitude, longitude }) {
    const survivor = await Survivor.findOne({ where: { id } });

    if (!survivor) {
      throw new Error('Survivor id invalid');
    }

    await SurvivorRepository.update({
      id: survivor.id,
      name,
      age,
      gender,
      latitude,
      longitude,
    });
  }
}

export default new UpdateSurvivorService();
