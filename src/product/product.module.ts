import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductService } from './product.service';
import { ProductsController } from './productsController';
import { ProductExistsRule } from '../utils/validation/ProductExists';

@Module({
    imports: [PrismaModule],
    providers: [ProductService, ProductExistsRule],
    exports: [ProductService],
    controllers: [ProductsController],
})
export class ProductModule {}
