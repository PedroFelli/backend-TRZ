import ListItemsSurvivor from '../services/ListItemsSurvivor';
import TradeItemsService from '../services/TradeItemsService';

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

  async trade(req, res) {
    const { id } = req.params;

    const { itemsPick, itemsPayment, owner_id } = req.body;

    try {
      await TradeItemsService.execute({
        survivor_id: id,
        itemsPayment: itemsPick,
        survivorReceivementId: owner_id,
        itemsReceivement: itemsPayment,
      });

      // @TODO: back to 204 status
      return res.status(200).json({ msg: 'troca efetuada' });
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

export default new ItemController();
