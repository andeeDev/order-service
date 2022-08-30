import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuctionProduct, Bid } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BidTaskService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron(): Promise<void> {
        try {
            const items: any = await this.prismaService.auctionProduct.findMany({
                where: {
                    OR: [
                        // eslint-disable-next-line unicorn/no-null
                        { buyerId: null },
                        { buyerId: { isSet: false } },
                    ],
                    sellTil: {
                        lte: new Date(),
                    },
                    bids: {
                        some: {},
                    },
                },
                include: {
                    bids: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                    },
                },
            });

            const bids: Bid[] = items.map((item: any) => {
                return item.bids[0];
            });

            const results: AuctionProduct[] = await Promise.all(
                bids.map(({ auctionProductId, userId }: Bid) => this.addBuyerIdToProduct(auctionProductId, userId)),
            );

            const loggerResults: string[] = results.map(({ id, sellTil, buyerId }: AuctionProduct) => {
                return `Item with id = ${id}, sellTil ${sellTil}, was set buyerId = ${buyerId}`;
            });

            if (results.length > 0) {
                this.logger.info(loggerResults);
            }
        } catch (error: unknown) {
            this.logger.error(error as Error);
        }
    }

    async addBuyerIdToProduct(id: string, buyerId: number): Promise<AuctionProduct> {
        return this.prismaService.auctionProduct.update({
            where: {
                id,
            },
            data: {
                buyerId,
            },
        });
    }
}
