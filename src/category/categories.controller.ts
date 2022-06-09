import { Controller, Get, Param } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    @Get()
    getAllCategories(): Promise<Category[]> {
        return this.categoryService.getAll();
    }

    @Get('/:category/products')
    getProductsByCategory(@Param() param): Promise<Product[]> {
        return this.categoryService.getProductsByCategory(param.category);
    }
}
