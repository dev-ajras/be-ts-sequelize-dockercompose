import { Router } from 'express';
import routesMovement from './movement';

const routes: Router = Router();
routes.use('/movement', routesMovement);

export default routes;