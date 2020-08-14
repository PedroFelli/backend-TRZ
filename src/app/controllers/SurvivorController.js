import CreateSurvivorService from '../services/CreateSurvivorService';

class SurvivorController {
  async store(req, res) {
    const { name, age, gender, latitude, longitude, item } = req.body;

    try {
      const { createdItem, survivor } = await CreateSurvivorService.execute({
        name,
        age,
        gender,
        latitude,
        longitude,
        item,
      });

      return res.json({ createdItem, survivor });
    } catch (err) {
      return res.json(err.message);
    }
  }
}

export default new SurvivorController();
