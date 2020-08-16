import ListItemsSurvivor from '../services/ListItemsSurvivor';

class ItemController {
  async show(req, res) {
    const { id } = req.params;

    try {
      const items = await ListItemsSurvivor.execute(id);

      // @TODO: back to 204 status
      return res.status(200).json(items);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new ItemController();
