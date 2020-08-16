import SurvivorRepository from '../repositories/SurvivorRepository';

class FindSurvivorService {
  constructor(survivorRepository = SurvivorRepository) {
    this.survivorRepository = survivorRepository;
  }

  async execute() {
    const response = await this.survivorRepository.findAll();

    const survivors = response.map((survivor) => {
      survivor.lonlat =
        survivor.lonlat && `POINT (${survivor.lonlat.coordinates})`;
      return survivor;
    });
    return survivors;
  }
}

export default new FindSurvivorService();
