import { AuctionProduct } from '@prisma/client';
import { GenericResponse } from './basic';
import { AuctionProductWithBids } from '../AuctionProductWithBids';

export interface CreateAuctionProductRes extends GenericResponse {
    payload?: AuctionProduct;
}
export interface GetOneAuctionProductRes extends GenericResponse {
    payload?: AuctionProductWithBids;
}
export interface GetAllAuctionProductRes extends GenericResponse {
    payload?: AuctionProduct[];
}
