import { Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prismaService: PrismaService) {}

    getAll(): Promise<Category[]> {
        return this.prismaService.category.findMany({});
    }

    async getProductsByCategory(categoryId: string): Promise<Product[]> {
        return this.prismaService.product.findMany({
            where: {
                category: { id: categoryId },
            },
        });
    }
}
