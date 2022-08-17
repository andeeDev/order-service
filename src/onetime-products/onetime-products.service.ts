import { Injectable } from '@nestjs/common';
import { AuctionProduct } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuctionDto } from './dto/CreateAuctionProduct';
import { AuctionProductDto } from './dto/AuctionProductDto';
import { AuctionProductWithBids } from '../utils/types/AuctionProductWithBids';

@Injectable()
export class OnetimeProductsService {
    constructor(private prismaService: PrismaService) {}

    getAll(): Promise<AuctionProduct[]> {
        return this.prismaService.auctionProduct.findMany({
            include: {
                bids: true,
            },
        });
    }

    getOneProduct({ productId: id }: AuctionProductDto): Promise<AuctionProductWithBids> {
        return this.prismaService.auctionProduct.findUnique({
            where: { id },
            include: {
                bids: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });
    }

    create({
        title,
        mainImg,
        description,
        startPrice,
        category,
        userId,
        createdAt,
        sellTil,
    }: CreateAuctionDto): Promise<AuctionProduct> {
        return this.prismaService.auctionProduct.create({
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
    }
}
