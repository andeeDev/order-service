import { Controller } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    @MessagePattern('categories')
    getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAll();
    }

    @MessagePattern('categoryProduct')
    getProductsByCategory(@Payload() payload): Promise<Product[]> {
        return this.categoryService.getProductsByCategory(payload.id);
    }
}
