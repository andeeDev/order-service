import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuctionProduct, Bid } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/CreateBidDto';
import { BidsSuccessTypes } from '../utils/messages/success/SuccessTypes';
import { CreateBidRes, GenericResponse, FetchAllBidsRes } from '../utils/types/ReturnTypes';
import { ExceptionHandler } from '../utils/helpers/RemoteExceptionHelper';
import { BidsErrorTypes } from '../utils/messages/errors/ErrorTypes';
import { genericSuccessResponse } from '../utils/types/DefaultSuccessResponse';

@Injectable()
export class BidsService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly prismaService: PrismaService,
    ) {}

    async getAll(productId: string): Promise<FetchAllBidsRes> {
        try {
            const bids: Bid[] = await this.prismaService.bid.findMany({
                where: {
                    auctionProductId: productId,
                },
            });

            this.logger.info({ type: BidsSuccessTypes.BidsFetchAllSuccess });

            return {
                ...genericSuccessResponse,
                payload: bids,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, BidsErrorTypes.BidsFetchAllError);
        }
    }

    async create({ price, productId, userId }: CreateBidDto): Promise<CreateBidRes> {
        try {
            const auctionProduct: AuctionProduct = await this.prismaService.auctionProduct.findUnique({
                where: {
                    id: productId,
                },
            });

            if (auctionProduct.sellTil.getTime() < Date.now()) {
                return <GenericResponse>{
                    message: 'The bids are not accepted anymore due to the date',
                    status: HttpStatus.BAD_REQUEST,
                };
            }
            const bid: Bid = await this.prismaService.bid.create({
                data: {
                    price,
                    userId,
                    auctionProductId: productId,
                },
            });

            this.logger.info({ type: BidsSuccessTypes.BidsCreateSuccess });

            return {
                ...genericSuccessResponse,
                payload: bid,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, BidsErrorTypes.BidsCreateError);
        }
    }
}
