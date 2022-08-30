import { GenericResponse } from './basic';
import { Product } from '@prisma/client';

export interface GetAllProductsRes extends GenericResponse {
    payload?: Product[],
}
export interface GetOneProductRes extends GenericResponse {
    payload?: Product,
}
export type CreateProductRes = GetOneProductRes
export type UpdateProductRes = GetOneProductRes;
export type DeleteProductRes = GetOneProductRes;