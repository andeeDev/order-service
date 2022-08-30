import { Controller } from '@nestjs/common';
import { Order } from '@prisma/client';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderDto } from './dto/OrderDto';
import { GetOrdersDto } from './dto/GetOrdersDto';
import { DeleteOrderDto } from './dto/DeleteDto';
import { CreateOrderRes, DeleteOrderRes, GetAllUserOrdersOrderRes } from '../utils/types/returnTypes';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrderService) {}

    @MessagePattern('orders')
    getAll(@Payload() payload: GetOrdersDto): Promise<GetAllUserOrdersOrderRes> {
        return this.orderService.getAllUserOrders(payload.userId);
    }

    @MessagePattern('orders/create')
    create(@Payload() data: OrderDto): Promise<CreateOrderRes> {
        return this.orderService.create(data);
    }

    @MessagePattern('orders/delete')
    delete(@Payload() payload: DeleteOrderDto): Promise<DeleteOrderRes> {
        return this.orderService.delete(payload.userId, payload.orderId);
    }
}
