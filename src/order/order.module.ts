import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OrderService } from './order.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [PrismaModule],
    providers: [OrderService],
    exports: [OrderService],
    controllers: [OrdersController],
})
export class OrderModule {}
