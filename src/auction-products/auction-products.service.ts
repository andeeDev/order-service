import { Inject, Injectable } from '@nestjs/common';
import { AuctionProduct } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuctionDto } from './dto/CreateAuctionProduct';
import { AuctionProductDto } from './dto/AuctionProductDto';
import { AuctionProductWithBids } from '../utils/types/AuctionProductWithBids';
import { AppLogger } from '../utils/helpers/CustomLogger';
import { AuctionProductsSuccessTypes } from '../utils/messages/success/SuccessTypes';
import { ExceptionHandler } from '../utils/helpers/RemoteExceptionHelper';
import { AuctionProductsErrorTypes } from '../utils/messages/errors/ErrorTypes';
import { genericSuccessResponse } from '../utils/types/DefaultSuccessResponse';
import { CreateAuctionProductRes, GetAllAuctionProductRes, GetOneAuctionProductRes } from '../utils/types/returnTypes';

@Injectable()
export class AuctionProductsService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getAll(): Promise<GetAllAuctionProductRes> {
        try {
            const auctionProducts: AuctionProduct[] = await this.prismaService.auctionProduct.findMany({
                include: {
                    bids: true,
                },
            });

            AppLogger.logInfo(this.logger, { type: AuctionProductsSuccessTypes.FetchAllAuctionProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: auctionProducts,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, AuctionProductsErrorTypes.FetchAllAuctionProductsError);
        }
    }

    async getOneProduct({ productId: id }: AuctionProductDto): Promise<GetOneAuctionProductRes> {
        try {
            const auctionProduct: AuctionProductWithBids = await this.prismaService.auctionProduct.findUnique({
                where: { id },
                include: {
                    bids: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
            });

            AppLogger.logInfo(this.logger, { type: AuctionProductsSuccessTypes.FetchOneAuctionProductSuccess });

            return {
                ...genericSuccessResponse,
                payload: auctionProduct,
            };
        } catch (error) {
            return ExceptionHandler.handleError(error, AuctionProductsErrorTypes.FetchOneAuctionProductError);
        }
    }

    async create({
        title,
        mainImg,
        description,
        startPrice,
        category,
        userId,
        createdAt,
        sellTil,
    }: CreateAuctionDto): Promise<CreateAuctionProductRes> {
        try {
            const auctionProduct: AuctionProduct = await this.prismaService.auctionProduct.create({
                data: {
                    title,
                    description,
                    startPrice,
                    mainImg,
                    createdAt,
                    sellTil,
                    creatorId: userId,
                    category: {
                        connectOrCreate: {
                            where: {
                                title: category,
                            },
                            create: {
                                title: category,
                            },
                        },
                    },
                },
            });

            AppLogger.logInfo(this.logger, { type: AuctionProductsSuccessTypes.CreateAuctionProductSuccess });

            return {
                ...genericSuccessResponse,
                payload: auctionProduct,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, AuctionProductsErrorTypes.CreateOneAuctionProductError);
        }
    }
}
