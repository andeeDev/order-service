import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from './category.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [PrismaModule],
    providers: [CategoryService],
    exports: [],
    controllers: [CategoriesController],
})
export class CategoryModule {}
