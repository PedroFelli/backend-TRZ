import * as Yup from 'yup';
import CreateSurvivorService from '../services/CreateSurvivorService';
import FindSurvivorService from '../services/FindSurvivorService';
import ListAllSurvivoslService from '../services/ListAllSurvivoslService';
import UpdateSurvivorService from '../services/UpdateSurvivorService';

class SurvivorController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      age: Yup.number().required().positive().min(18),
      gender: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('validation fails');
    }

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

    const schema = Yup.object().shape({
      age: Yup.string().required(),
      latitude: Yup.string().required(),
      longitude: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('validation fails');
    }

    try {
      await UpdateSurvivorService.execute({
        id,
        name,
        age,
        gender,
        latitude,
        longitude,
      });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new SurvivorController();
