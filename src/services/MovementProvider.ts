import { MovementModel } from '../models/movement';
import { FilterMovement } from '../utils/types';
import { Op } from 'sequelize';

class MovementProvider {

    public async createMovement(movement: Partial<MovementModel>): Promise<MovementModel> {
        return await MovementModel.create(movement);
    }

    public async getMovements(page = 1, limit = 10): Promise<{rows: MovementModel[], count: number}> {
        const offset = (page - 1) * limit;
        return await MovementModel.findAndCountAll({
            limit,
            offset,
            order: [['date', 'DESC']]
        });
    }

    public async filterMovements(filter: FilterMovement): Promise<MovementModel[]> {
        const whereClause: any = {};
        
        if (filter.origin) {
            whereClause.origin = filter.origin;
        }
        
        if (filter.dateFrom || filter.dateTo) {
            whereClause.date = {};
            if (filter.dateFrom) {
                whereClause.date[Op.gte] = filter.dateFrom;
            }
            if (filter.dateTo) {
                whereClause.date[Op.lte] = filter.dateTo;
            }
        }
        
        return await MovementModel.findAll({ where: whereClause });
    }

    public async updateMovement(id: string, movement: Partial<MovementModel>): Promise<[affectedCount: number]> {
        return await MovementModel.update(movement, { where: { id } });
    }

    public async deleteMovement(id: string): Promise<number> {
        return await MovementModel.destroy({ where: { id } });
    }

    public async getBalance(): Promise<number> {
        const result = await MovementModel.sum('amount');
        return result || 0; // Retornamos 0 si no hay movimientos
    }
}

export default new MovementProvider();