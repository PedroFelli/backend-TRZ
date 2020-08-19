import Sequelize from 'sequelize';
import SurvivorRepository from '../repositories/SurvivorRepository';
import ItemSurvivorRepository from '../repositories/ItemSurvivorRepository';

import databaseConfig from '../../config/database';

class CreateSurvivorService {
  async execute({ name, age, gender, latitude, longitude, items }) {
    const checkName = await SurvivorRepository.findByName(name);

    if (checkName) {
      throw Error('Name alredy used!');
    }

    const sequelize = new Sequelize(databaseConfig);

    const t = await sequelize.transaction();

    try {
      const survivor = await SurvivorRepository.store(
        {
          name,
          age,
          gender,
          longitude,
          latitude,
        },
        { transaction: t }
      );

      await Promise.all(
        items.map((item) =>
          ItemSurvivorRepository.store(
            {
              item_id: item.item_id,
              quantity: item.quantity,
              survivor_id: survivor.id,
            },
            { transaction: t }
          )
        )
      );

      await t.commit();
    } catch (err) {
      await t.rollback();
    }

    return true;
  }
}

export default new CreateSurvivorService();
