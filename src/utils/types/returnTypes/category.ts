import { Category, Product } from '@prisma/client';
import { GenericResponse } from './basic';

export interface ProductsByCategoryRes extends GenericResponse {
    payload?: Product[];
}

export interface GetAllCategoriesRes extends GenericResponse {
    payload?: Category[];
}
