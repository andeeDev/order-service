import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OnetimeProductsService } from './onetime-products.service';
import { CreateAuctionDto } from './dto/CreateAuctionProduct';
import { AuctionProductDto } from './dto/AuctionProductDto';

@Controller('onetime-products')
export class OnetimeProductsController {
    constructor(private onetimeProductsService: OnetimeProductsService) {}

    @MessagePattern('/auction/products/getAll')
    getAll(): Promise<any> {
        return this.onetimeProductsService.getAll();
    }

    @MessagePattern('/auction/products/one')
    getOneProduct(@Payload() payload: AuctionProductDto): Promise<any> {
        return this.onetimeProductsService.getOneProduct(payload);
    }

    @MessagePattern('/auction/products/create')
    create(data: CreateAuctionDto): Promise<any> {
        return this.onetimeProductsService.create(data);
    }
}
