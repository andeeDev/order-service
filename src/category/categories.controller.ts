import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { GetAllCategoriesRes, ProductsByCategoryRes } from '../utils/types/returnTypes';

@Controller('categories')
export class CategoriesController {
    constructor(private categoryService: CategoryService) {}

    @MessagePattern('categories')
    getAllCategories(): Promise<GetAllCategoriesRes> {
        return this.categoryService.getAll();
    }

    @MessagePattern('categoryProduct')
    getProductsByCategory(@Payload() payload): Promise<ProductsByCategoryRes> {
        return this.categoryService.getProductsByCategory(payload.id);
    }
}
