import { Inject, Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../prisma/prisma.service';
import { AppLogger } from '../utils/helpers/CustomLogger';
import { CategoryErrorTypes } from '../utils/messages/errors/ErrorTypes';
import { CategorySuccessTypes } from '../utils/messages/success/SuccessTypes';
import { ExceptionHandler } from '../utils/helpers/RemoteExceptionHelper';
import { GetAllCategoriesRes, ProductsByCategoryRes } from '../utils/types/returnTypes';
import { genericSuccessResponse } from '../utils/types/DefaultSuccessResponse';

@Injectable()
export class CategoryService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private prismaService: PrismaService,
    ) {}

    async getAll(): Promise<GetAllCategoriesRes> {
        try {
            const categories: Category[] = await this.prismaService.category.findMany({});

            AppLogger.logInfo(this.logger, { type: CategorySuccessTypes.GetAllCategoriesSuccess });

            return {
                ...genericSuccessResponse,
                payload: categories,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, CategoryErrorTypes.GetAllCategoriesError);
        }
    }

    async getProductsByCategory(categoryId: string): Promise<ProductsByCategoryRes> {
        try {
            const products: Product[] = await this.prismaService.product.findMany({
                where: {
                    category: { id: categoryId },
                },
            });

            AppLogger.logInfo(this.logger, { type: CategorySuccessTypes.GetProductsByCategorySuccess });

            return {
                ...genericSuccessResponse,
                payload: products,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, CategoryErrorTypes.GetProductsByCategoryError);
        }
    }
}
