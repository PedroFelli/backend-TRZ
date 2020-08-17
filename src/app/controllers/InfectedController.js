import FlagSurvivorService from '../services/FlagSurvivorService';
import Infected from '../models/Infected';

class SurvivorController {
  async store(req, res) {
    const survivor_id = req.params.id;

    const { infected_id } = req.body;

    try {
      await FlagSurvivorService.execute({
        survivor_id,
        infected_id,
      });

      // @TODO: back to 204 status
      return res.status(204).json();
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new SurvivorController();
