import { Controller } from '@nestjs/common';
import { Product } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { ProductIdDto } from './dto/ProductIdDto';
import { ProductWithIdDto } from './dto/ProductWithIdDto';
import { ProductDto } from './dto/ProductDto';

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @MessagePattern('products')
    getAll(): Promise<Product[]> {
        return this.productService.get();
    }

    @MessagePattern('products/single')
    findOne(@Payload() payload: ProductIdDto): Promise<Product> {
        return this.productService.findOne(payload.id);
    }

    @MessagePattern('products/create')
    create(@Payload() payload: ProductDto): Promise<Product> {
        return this.productService.create(payload);
    }

    @MessagePattern('products/update')
    update(@Payload() payload: ProductWithIdDto): Promise<Product> {
        return this.productService.update(payload.id, payload.body);
    }

    @MessagePattern('products/delete')
    delete(@Payload() payload: ProductIdDto): Promise<Product> {
        return this.productService.delete(payload.id);
    }
}
