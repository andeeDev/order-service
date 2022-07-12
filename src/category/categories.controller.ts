import { Controller } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { CategoryService } from './category.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

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
