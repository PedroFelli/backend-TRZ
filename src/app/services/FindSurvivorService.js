import SurvivorRepository from '../repositories/SurvivorRepository';

class FindSurvivorService {
  constructor(survivorRepository = SurvivorRepository) {
    this.survivorRepository = survivorRepository;
  }

  async execute(id) {
    const response = await this.survivorRepository.findById(id);

    if (!response) {
      throw Error('Survivor not found');
    }

    response.lonlat = `POINT (${response.lonlat.coordinates})`;

    return response;
  }
}

export default new FindSurvivorService();
