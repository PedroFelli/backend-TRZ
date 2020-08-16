import CreateSurvivorService from '../services/CreateSurvivorService';
import FindSurvivorService from '../services/FindSurvivorService';
import ListAllSurvivoslService from '../services/ListAllSurvivoslService';

class SurvivorController {
  async store(req, res) {
    const { name, age, gender, latitude, longitude, items } = req.body;

    try {
      const survivor = await CreateSurvivorService.execute({
        name,
        age,
        gender,
        latitude,
        longitude,
        items,
      });

      return res.status(204).json(survivor);
    } catch (err) {
      return res.status(400).json({ error: err.message });
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
      return res.json(err.message);
    }
  }
}

export default new SurvivorController();
