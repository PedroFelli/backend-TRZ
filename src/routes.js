import { Router } from 'express';
import SurvivorController from './app/controllers/SurvivorController';

const routes = new Router();

routes.post('/survivors', SurvivorController.store);

export default routes;
