import { UUID } from "crypto";

interface Response {
    status: number;
    message: string;
}
export interface ResponseSuccess<T> extends Response {
    data: T
}

export interface ResponseError<T> {
    errors?: T
}

export interface Movement {
    id?: UUID;
    description?: string;
    amount?: number;
    date?: Date;
    origin?: string;
}

export interface FilterMovement {
    dateFrom?: Date;
    dateTo?: Date;
    origin?: string;
}
