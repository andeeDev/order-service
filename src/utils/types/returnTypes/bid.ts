import { Bid } from '@prisma/client';
import { GenericResponse } from './basic';

export interface CreateBidRes extends GenericResponse {
    payload?: Bid
}

export interface FetchAllBidsRes extends GenericResponse {
    payload?: Bid[]
}
