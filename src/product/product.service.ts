import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { RemoteExceptionHelper } from '../utils/helpers/RemoteExceptionHelper';
import { ProductDto } from './dto/ProductDto';

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    get(): Promise<Product[]> {
        try {
            return this.prismaService.product.findMany({
                include: {
                    category: true,
                },
            });
        } catch (error: unknown) {
            return RemoteExceptionHelper.handleRemoteError(this.logger, error);
        }
    }

    async findOne(id: string): Promise<Product> {
        const product: Product = await this.prismaService.product.findUnique({
            where: { id },
        });

        if (!product) throw new BadRequestException('Product not found');

        return product;
    }

    async create(data: ProductDto): Promise<Product> {
        return this.prismaService.product.create({
            data: {
                ...data,
                category: {
                    connectOrCreate: {
                        where: { title: data.category },
                        create: { title: data.category },
                    },
                },
            },
        });
    }

    async update(id: string, data: ProductDto): Promise<Product> {
        const { category: categoryTitle, ...restData } = data;
        const category: Category = await this.prismaService.category.findUnique({ where: { title: categoryTitle } });

        if (!category) throw new BadRequestException('Model not found');

        return this.prismaService.product.update({
            where: { id },
            data: {
                ...restData,
                categoryId: category.id,
            },
        });
    }

    delete(id: string): Promise<Product> {
        return this.prismaService.product.delete({
            where: { id },
        });
    }
}
