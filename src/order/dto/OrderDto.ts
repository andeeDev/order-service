import { OrderProductDto } from './OrderProductDto';

export class OrderDto {
    products: OrderProductDto[];

    userId?: number;
}
