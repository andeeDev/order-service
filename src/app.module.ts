import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderService } from './order/order.service';
import { OrdersController } from './order/orders.controller';
import { OrderModule } from './order/order.module';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';
import { CategoryModule } from './category/category.module';
import { OnetimeProductsController } from './onetime-products/onetime-products.controller';
import { OnetimeProductsModule } from './onetime-products/onetime-products.module';
import { BidsModule } from './bids/bids.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
            envFilePath: ['.env'],
        }),
        ProductModule,
        OrderModule,
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: 'app.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
                    ),
                }),
            ],
        }),
        CategoryModule,
        OnetimeProductsModule,
        BidsModule,
    ],
    controllers: [OrdersController, OnetimeProductsController],
    providers: [ProductService, PrismaService, OrderService],
})
export class AppModule {}
