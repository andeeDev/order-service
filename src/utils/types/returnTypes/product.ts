import { Product } from '@prisma/client';
import { GenericResponse } from './basic';

export interface GetAllProductsRes extends GenericResponse {
    payload?: Product[];
}
export interface GetOneProductRes extends GenericResponse {
    payload?: Product;
}
export type CreateProductRes = GetOneProductRes;
export type UpdateProductRes = GetOneProductRes;
export type DeleteProductRes = GetOneProductRes;
