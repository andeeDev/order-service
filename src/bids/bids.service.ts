import { Injectable } from '@nestjs/common';
import { Bid } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/CreateBidDto';

@Injectable()
export class BidsService {
    constructor(private readonly prismaService: PrismaService) {}

    getAll(productId: string): Promise<Bid[]> {
        return this.prismaService.bid.findMany({
            where: {
                auctionProductId: productId,
            },
        });
    }

    create({ price, productId, userId }: CreateBidDto): Promise<Bid> {
        return this.prismaService.bid.create({
            data: {
                price,
                userId,
                auctionProductId: productId,
            },
        });
    }
}
