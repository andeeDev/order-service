import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuctionProductsService } from './auction-products.service';
import { AuctionProductsController } from './auction-products.controller';

@Module({
    imports: [PrismaModule],
    providers: [AuctionProductsService],
    exports: [AuctionProductsService],
    controllers: [AuctionProductsController],
})
export class AuctionProductsModule {}
