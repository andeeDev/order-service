import { Controller } from '@nestjs/common';
import { Order } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto } from './dto/OrderDto';
import { GetOrders } from './dto/GetOrders';
import { DeleteOrder } from './dto/DeleteDto';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrderService) {}

    @MessagePattern('orders')
    getAll(@Payload() payload: GetOrders): Promise<Order[]> {
        return this.orderService.getAllUserOrders(payload.userId);
    }

    @MessagePattern('orders/create')
    create(@Payload() data: OrderDto): Promise<Order> {
        return this.orderService.create(data);
    }

    @MessagePattern('orders/delete')
    delete(@Payload() payload: DeleteOrder): Promise<Order> {
        return this.orderService.delete(payload.userId, payload.orderId);
    }
}
