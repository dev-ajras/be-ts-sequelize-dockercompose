import { Router } from 'express';
import MovementController from '../controllers/MovementController';

const routesMovement: Router = Router();

// Implementar las rutas para cada método del controlador
routesMovement.post('/', MovementController.createMovement);
routesMovement.get('/', MovementController.getMovements);
routesMovement.post('/filter', MovementController.filterMovements);
routesMovement.put('/:id', MovementController.updateMovement);
routesMovement.delete('/:id', MovementController.deleteMovement);

export default routesMovement;
