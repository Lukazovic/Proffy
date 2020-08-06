import express from 'express';

import UsersController from './controllers/UsersController';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const usersController = new UsersController();
const classesController = new ClassesController();
const connectionsControllers = new ConnectionsController();

routes.get('/users', usersController.index);

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsControllers.index);
routes.post('/connections', connectionsControllers.create);

export default routes;
