import { Request, Response } from 'express';
import MovementProvider from '../services/MovementProvider';
import { Movement, FilterMovement } from '../utils/types';
import * as ResponseHandler from '../handlers/ResponseHandler';
import { z } from 'zod';

const MovementSchema = z.object({
    description: z.string().optional(),
    amount: z.number(),
    date: z.string().or(z.date()).transform(val => new Date(val)),
    origin: z.string()
});

class MovementController {

    public async createMovement(req: Request, res: Response) {
        try {
            const validatedData = MovementSchema.parse(req.body);
            const newMovement = await MovementProvider.createMovement(validatedData);
            ResponseHandler.success(res, newMovement, 'Movement created successfully');
        } catch (error) {
            ResponseHandler.badRequestError(res, error, 'Invalid movement data');
        }
    }

    public async getMovements(req: Request, res: Response) {
        const movements = await MovementProvider.getMovements();
        ResponseHandler.success(res, movements, 'Movements fetched successfully');
    }

    public async filterMovements(req: Request, res: Response) {
        try {
            const filter: FilterMovement = {
                dateFrom: req.body.dateFrom ? new Date(req.body.dateFrom) : undefined,
                dateTo: req.body.dateTo ? new Date(req.body.dateTo) : undefined,
                origin: req.body.origin || undefined
            };
            
            const filteredMovements = await MovementProvider.filterMovements(filter);
            ResponseHandler.success(res, filteredMovements, 'Movements filtered successfully');
        } catch (error) {
            ResponseHandler.badRequestError(res, error, 'Invalid date format');
        }
    }

    public async updateMovement(req: Request, res: Response) {
        const id: string = req.params.id;
        const movement: Movement = req.body;
        const updatedMovement = await MovementProvider.updateMovement(id, movement);
        ResponseHandler.success(res, updatedMovement, 'Movement updated successfully');
    }

    public async deleteMovement(req: Request, res: Response) {
        const id: string = req.params.id;
        const deletedMovement = await MovementProvider.deleteMovement(id);
        ResponseHandler.success(res, deletedMovement, 'Movement deleted successfully');
    }
}

export default new MovementController();