import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Category, Product } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionHandler } from '../utils/helpers/RemoteExceptionHelper';
import { ProductDto } from './dto/ProductDto';
import { AppLogger } from '../utils/helpers/CustomLogger';
import { ProductErrorTypes } from '../utils/messages/errors/ErrorTypes';
import { ProductSuccessTypes } from '../utils/messages/success/SuccessTypes';
import { genericSuccessResponse } from '../utils/types/DefaultSuccessResponse';
import {
    CreateProductRes,
    DeleteProductRes,
    GenericResponse,
    GetAllProductsRes,
    GetOneProductRes,
    UpdateProductRes,
} from '../utils/types/returnTypes';

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async get(): Promise<GetAllProductsRes> {
        try {
            const products: Product[] = await this.prismaService.product.findMany({
                include: {
                    category: true,
                },
            });

            AppLogger.logInfo(this.logger, { type: ProductSuccessTypes.FetchAllProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: products,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, ProductErrorTypes.FetchAllProductsError);
        }
    }

    async findOne(id: string): Promise<GetOneProductRes> {
        try {
            const product: Product = await this.prismaService.product.findUnique({
                where: { id },
            });

            if (!product)
                return <GenericResponse>{
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Product not found',
                };

            AppLogger.logInfo(this.logger, { type: ProductSuccessTypes.FetchOneProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: product,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, ProductErrorTypes.FetchOneProductsError);
        }
    }

    async create(data: ProductDto): Promise<CreateProductRes> {
        try {
            const product: Product = await this.prismaService.product.create({
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

            AppLogger.logInfo(this.logger, { type: ProductSuccessTypes.CreateProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: product,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, ProductErrorTypes.CreateProductsError);
        }
    }

    async update(id: string, data: ProductDto): Promise<UpdateProductRes> {
        try {
            const { category: categoryTitle, ...restData } = data;
            const category: Category = await this.prismaService.category.findUnique({
                where: { title: categoryTitle },
            });

            if (!category) {
                return <GenericResponse>{
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Model not found',
                };
            }

            const product: Product = await this.prismaService.product.update({
                where: { id },
                data: {
                    ...restData,
                    categoryId: category.id,
                },
            });

            AppLogger.logInfo(this.logger, { type: ProductSuccessTypes.UpdateProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: product,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, ProductErrorTypes.UpdateProductsError);
        }
    }

    async delete(id: string): Promise<DeleteProductRes> {
        try {
            const product: Product = await this.prismaService.product.delete({
                where: { id },
            });

            AppLogger.logInfo(this.logger, { type: ProductSuccessTypes.DeleteProductsSuccess });

            return {
                ...genericSuccessResponse,
                payload: product,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, ProductErrorTypes.DeleteProductsError);
        }
    }
}
