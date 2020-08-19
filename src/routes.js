import { Router } from 'express';

import SurvivorController from './app/controllers/SurvivorController';
import InfectedController from './app/controllers/InfectedController';
import ItemsController from './app/controllers/ItemsController';
import ReportController from './app/controllers/ReportController';

const routes = new Router();

routes.post('/survivors', SurvivorController.store);
routes.get('/survivors', SurvivorController.index);

routes.get('/survivors/:id/properties/', ItemsController.show);
routes.get('/survivors/:id/', SurvivorController.show);
routes.put('/survivors/:id/', SurvivorController.update);

routes.post('/report/:id', InfectedController.store);

routes.get('/report/infected', ReportController.infecteds);
routes.get('/report/non-infected', ReportController.noninfecteds);
routes.get('/report/people-inventory', ReportController.peopleinventory);

export default routes;
