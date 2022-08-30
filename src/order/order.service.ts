import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/OrderDto';
import { ExceptionHandler } from '../utils/helpers/RemoteExceptionHelper';
import { OrderErrorTypes } from '../utils/messages/errors/ErrorTypes';
import { CreateOrderRes, DeleteOrderRes, GenericResponse, GetAllUserOrdersOrderRes } from '../utils/types/returnTypes';
import { genericSuccessResponse } from '../utils/types/DefaultSuccessResponse';
import { AppLogger } from '../utils/helpers/CustomLogger';
import { OrderSuccessTypes } from '../utils/messages/success/SuccessTypes';

@Injectable()
export class OrderService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private prismaService: PrismaService,
    ) {}

    async getAllUserOrders(userId): Promise<GetAllUserOrdersOrderRes> {
        try {
            const orders: Order[] = await this.prismaService.order.findMany({
                where: { userId },
                include: {
                    orderProducts: {
                        include: { product: true },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            AppLogger.logInfo(this.logger, { type: OrderSuccessTypes.FetchAllOrdersSuccess });

            return {
                ...genericSuccessResponse,
                payload: orders,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, OrderErrorTypes.FetchAllOrdersError);
        }
    }

    async create(data: OrderDto): Promise<CreateOrderRes> {
        try {
            const order: Order = await this.prismaService.order.create({
                data: {
                    userId: data.userId,
                    orderProducts: {
                        createMany: {
                            data: data.products,
                        },
                    },
                },
            });

            AppLogger.logInfo(this.logger, { type: OrderSuccessTypes.CreateOrderSuccess });

            return {
                ...genericSuccessResponse,
                payload: order,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, OrderErrorTypes.CreateOrderError);
        }
    }

    async delete(userId: number, orderId: string): Promise<DeleteOrderRes> {
        try {
            const orderDb: Order = await this.prismaService.order.findUnique({ where: { id: orderId } });

            if (!orderDb)
                return <GenericResponse>{
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Model doesnt exist in the database',
                };

            const order: Order = await this.prismaService.order.delete({
                where: {
                    // index name
                    id_userId: {
                        id: orderId,
                        userId,
                    },
                },
            });

            AppLogger.logInfo(this.logger, { type: OrderSuccessTypes.DeleteOrderSuccess });

            return {
                ...genericSuccessResponse,
                payload: order,
            };
        } catch (error: unknown) {
            return ExceptionHandler.handleError(error, OrderErrorTypes.DeleteOrderError);
        }
    }
}
