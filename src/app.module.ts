import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoryService } from './category/category.service';
import { CategoriesController } from './category/categories.controller';
import { OrderService } from './order/order.service';
import { OrdersController } from './order/orders.controller';
import { OrderModule } from './order/order.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
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
    ],
    controllers: [CategoriesController, OrdersController],
    providers: [ProductService, PrismaService, CategoryService, OrderService],
})
export class AppModule {}
