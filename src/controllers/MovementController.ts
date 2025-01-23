import { Request, Response } from 'express';
import MovementProvider from '../services/MovementProvider';
import { Movement, FilterMovement } from '../utils/types';
import * as ResponseHandler from '../handlers/ResponseHandler';
import { z } from 'zod';

const MovementSchema = z.object({
    description: z.string().optional(),
    amount: z.string()
        .transform((val) => {
            // Eliminar el símbolo de menos si existe, lo agregaremos después
            const isNegative = val.startsWith('-');
            const cleanVal = val.replace('-', '');
            
            // Reemplazar la coma por punto para el parsing
            const normalized = cleanVal.replace(',', '.');
            
            // Multiplicar por 100 para convertir a centavos y redondear
            const cents = Math.round(parseFloat(normalized) * 100);
            
            // Devolver el valor negativo si corresponde
            return isNegative ? -cents : cents;
        }),
    date: z.string().or(z.date()).transform(val => new Date(val)),
    origin: z.string()
});

// Función de utilidad para transformar centavos a string con formato
const formatAmount = (cents: number): string => {
    const isNegative = cents < 0;
    const absoluteCents = Math.abs(cents);
    const euros = Math.floor(absoluteCents / 100);
    const remainingCents = absoluteCents % 100;
    const formattedCents = remainingCents.toString().padStart(2, '0');
    return `${isNegative ? '-' : ''}${euros},${formattedCents}`;
};

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
        const formattedMovements = {
            rows: movements.rows.map(mov => ({
                ...mov.toJSON(),
                amount: formatAmount(mov.amount)
            })),
            count: movements.count
        };
        ResponseHandler.success(res, formattedMovements, 'Movements fetched successfully');
    }

    public async filterMovements(req: Request, res: Response) {
        try {
            const filter: FilterMovement = {
                dateFrom: req.body.dateFrom ? new Date(req.body.dateFrom) : undefined,
                dateTo: req.body.dateTo ? new Date(req.body.dateTo) : undefined,
                origin: req.body.origin || undefined
            };
            
            const filteredMovements = await MovementProvider.filterMovements(filter);
            const formattedMovements = filteredMovements.map(mov => ({
                ...mov.toJSON(),
                amount: formatAmount(mov.amount)
            }));
            ResponseHandler.success(res, formattedMovements, 'Movements filtered successfully');
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

    public async getBalance(req: Request, res: Response) {
        try {
            const totalCents = await MovementProvider.getBalance();
            const formattedBalance = formatAmount(totalCents);
            ResponseHandler.success(res, { balance: formattedBalance }, 'Balance calculated successfully');
        } catch (error) {
            ResponseHandler.serverError(res, error, 'Error calculating balance');
        }
    }
}

export default new MovementController();