import { Router } from 'express';

import SurvivorController from './app/controllers/SurvivorController';

import InfectedController from './app/controllers/InfectedController';
import ItemsController from './app/controllers/ItemsController';

const routes = new Router();

routes.post('/survivors', SurvivorController.store);
routes.get('/survivors', SurvivorController.index);

routes.get('/survivors/:id/properties/', ItemsController.show);
routes.get('/survivors/:id/', SurvivorController.show);
routes.put('/survivors/:id/', SurvivorController.update);

routes.post('/report/:id', InfectedController.store);

export default routes;
