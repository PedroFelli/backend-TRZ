import SurvivorRepository from '../repositories/SurvivorRepository';
import ItemSurvivorRepository from '../repositories/ItemSurvivorRepository';
import ItemSurvivor from '../models/ItemSurvivor';

import { calItemsPoints } from '../../util/trade-utils';

class TradeItemsSurvivor {
  constructor(
    itemSurvivorRepository = ItemSurvivorRepository,
    survivorRepository = SurvivorRepository
  ) {
    this.itemSurvivorRepository = itemSurvivorRepository;
    this.survivorRepository = survivorRepository;
  }

  async execute({
    survivor_id,
    itemsPayment,
    survivorReceivementId,
    itemsReceivement,
  }) {
    const checkSurvivor = await this.survivorRepository.findById(survivor_id);

    if (!checkSurvivor) {
      throw Error(`Survivor not found: ${survivor_id}`);
    }

    const checkSurivorReceivement = await this.survivorRepository.findById(
      survivorReceivementId
    );

    if (!checkSurivorReceivement) {
      throw Error(`Survivor not found: ${survivorReceivementId}`);
    }

    // sum item * quantity;
    const sumItemsPayment = calItemsPoints(itemsPayment);

    const totalitemsReceivement = calItemsPoints(itemsReceivement);

    if (sumItemsPayment !== totalitemsReceivement) {
      throw new Error(
        'Both sides of the trade should offer the same amount of points. ' +
          `Your items are worth: ${sumItemsPayment}. Os itens escolhidos worth: ${totalitemsReceivement}`
      );
    }

    const checkItemsPickToPay = await ItemSurvivor.findAll({
      attributes: ['item_id', 'quantity', 'id', 'survivor_id'],
      where: { survivor_id },
      order: [['item_id', 'ASC']],
    });

    const checkItemsToRecive = await ItemSurvivor.findAll({
      attributes: ['item_id', 'quantity', 'id', 'survivor_id'],
      where: { survivor_id: survivorReceivementId },
      order: [['item_id', 'ASC']],
    });

    // check if payment is valid
    checkItemsPickToPay.map((itemBanco, i = 0) => {
      if (itemsPayment[i].quantity > itemBanco.quantity) {
        throw new Error(
          `You don't have enough resources. Item ${itemsPayment[i].item_id} in the quantity: ${itemsPayment[i].quantity}. You have available: ${itemBanco.quantity}`
        );
      }

      i++;
    });

    // check if recivement is valid
    checkItemsToRecive.map((itemBanco, y = 0) => {
      if (itemsReceivement[y].quantity > itemBanco.quantity) {
        throw new Error(
          `The other survivor does not have enough resources. Item ${itemsReceivement[y].item_id} in the quantity: ${itemsReceivement[y].quantity}. He has available: ${itemBanco.quantity}`
        );
      }

      y++;
    });

    // remove item from payment
    console.log('******* remove item from payment ********');
    await Promise.all(
      checkItemsPickToPay.map(async (itemBanco, a = 0) => {
        const newValue = itemBanco.quantity - itemsPayment[a].quantity;

        console.log(
          `${a} - Item: ${itemBanco.id}. Owner:  ${itemBanco.survivor_id} => ${itemBanco.quantity} - ${itemsPayment[a].quantity} = ${newValue}`
        );

        const newQuantity = await ItemSurvivorRepository.findById(itemBanco.id);

        newQuantity.quantity = newValue;
        await newQuantity.save();

        a++;
      })
    );

    const newsItemsFromSurvivor = await ItemSurvivor.findAll({
      attributes: ['item_id', 'quantity', 'id', 'survivor_id'],
      where: { survivor_id },
      order: [['item_id', 'ASC']],
    });

    // add news  items recivement
    console.log('******* add new items ********');
    await Promise.all(
      newsItemsFromSurvivor.map(async (itemBanco, a = 0) => {
        const newValue = itemBanco.quantity + itemsReceivement[a].quantity;

        console.log(
          `${a} - Item: ${itemBanco.id}. Owner:  ${itemBanco.survivor_id} => ${itemBanco.quantity} + ${itemsReceivement[a].quantity} = ${newValue}`
        );

        const newQuantity = await ItemSurvivorRepository.findById(itemBanco.id);

        newQuantity.quantity = newValue;
        await newQuantity.save();

        a++;
      })
    );

    // console.log('******* remove items recived ********');
    await Promise.all(
      checkItemsToRecive.map(async (itemBanco, b = 0) => {
        const newValue = itemBanco.quantity + itemsPayment[b].quantity;
        console.log(
          `${b} - Item: ${itemBanco.id}. Owner:  ${itemBanco.survivor_id} => ${itemBanco.quantity} + ${itemsPayment[b].quantity} = ${newValue}`
        );

        const newQuantity = await ItemSurvivorRepository.findById(itemBanco.id);

        newQuantity.quantity = newValue;
        await newQuantity.save();

        b++;
      })
    );

    const newItemsToRecive = await ItemSurvivor.findAll({
      attributes: ['item_id', 'quantity', 'id', 'survivor_id'],
      where: { survivor_id: survivorReceivementId },
      order: [['item_id', 'ASC']],
    });

    // add news  items recivement
    // console.log('******* remove items recived ********');
    await Promise.all(
      newItemsToRecive.map(async (itemBanco, b = 0) => {
        const newValue = itemBanco.quantity - itemsReceivement[b].quantity;
        console.log(
          `${b} - Item: ${itemBanco.id}. Owner:  ${itemBanco.survivor_id} => ${itemBanco.quantity} - ${itemsReceivement[b].quantity} = ${newValue}`
        );

        const newQuantity = await ItemSurvivorRepository.findById(itemBanco.id);

        newQuantity.quantity = newValue;
        await newQuantity.save();

        b++;
      })
    );

    return 'troca efetuada';
  }
}

export default new TradeItemsSurvivor();
