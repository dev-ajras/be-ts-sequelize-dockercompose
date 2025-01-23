import { Model, DataTypes } from 'sequelize';
import connection from '../utils/sequelize';
import { UUID } from 'crypto';

export class MovementModel extends Model {
    id!: UUID;
    description!: string;
    amount!: number;
    date!: Date;
    origin!: string;
    }

MovementModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { 
    sequelize: connection, 
    tableName: 'movements'
 });
