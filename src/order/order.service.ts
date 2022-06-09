import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { OrderDto } from './dto/OrderDto';

@Injectable()
export class OrderService {
    constructor(private prismaService: PrismaService) {}

    getAllUserOrders(userId): Promise<Order[]> {
        return this.prismaService.order.findMany({
            where: { userId },
            include: {
                orderProducts: {
                    include: { product: true },
                },
            },
        });
    }

    create(data: OrderDto): Promise<Order> {
        return this.prismaService.order.create({
            data: {
                userId: data.userId,
                orderProducts: {
                    createMany: {
                        data: data.products,
                    },
                },
            },
        });
    }

    async delete(userId: number, orderId: string): Promise<Order> {
        const order: Order = await this.prismaService.order.findUnique({ where: { id: orderId } });

        if (!order) throw new RpcException('Model doesnt exist in the database');

        return this.prismaService.order.delete({
            where: {
                // index name
                id_userId: {
                    id: orderId,
                    userId,
                },
            },
        });
    }
}
