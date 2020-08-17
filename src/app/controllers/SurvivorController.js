import CreateSurvivorService from '../services/CreateSurvivorService';
import FindSurvivorService from '../services/FindSurvivorService';
import ListAllSurvivoslService from '../services/ListAllSurvivoslService';
import Survivor from '../models/Survivor';
import SurvivorRepository from '../repositories/SurvivorRepository';

class SurvivorController {
  async store(req, res) {
    const { name, age, gender, latitude, longitude, items } = req.body;

    try {
      await CreateSurvivorService.execute({
        name,
        age,
        gender,
        latitude,
        longitude,
        items,
      });

      return res.status(204).json();
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const response = await FindSurvivorService.execute(id);

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async index(req, res) {
    try {
      const response = await ListAllSurvivoslService.execute();

      return res.json(response);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, age, gender, latitude, longitude } = req.body;

    const survivor = await Survivor.findOne({ where: { id } });

    if (!survivor) {
      throw new Error('Survivor id invalid');
    }

    try {
      const x = await SurvivorRepository.update({
        id: survivor.id,
        name,
        age,
        gender,
        latitude,
        longitude,
      });

      return res.json(x);
    } catch (err) {
      return res.json(err.message);
    }
  }
}

export default new SurvivorController();
