import { Order } from '@prisma/client';
import { GenericResponse } from './basic';

export interface DeleteOrderRes extends GenericResponse {
    payload?: Order
}
export interface CreateOrderRes extends GenericResponse {
    payload?: Order
}
export interface GetAllUserOrdersOrderRes extends GenericResponse {
    payload?: Order[]
}
