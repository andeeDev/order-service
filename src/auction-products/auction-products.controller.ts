import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuctionProductsService } from './auction-products.service';
import { CreateAuctionDto } from './dto/CreateAuctionProduct';
import { AuctionProductDto } from './dto/AuctionProductDto';
import { CreateAuctionProductRes, GetAllAuctionProductRes, GetOneAuctionProductRes } from '../utils/types/returnTypes';

@Controller('auction-products')
export class AuctionProductsController {
    constructor(private onetimeProductsService: AuctionProductsService) {}

    @MessagePattern('/auction/products/getAll')
    getAll(): Promise<GetAllAuctionProductRes> {
        return this.onetimeProductsService.getAll();
    }

    @MessagePattern('/auction/products/one')
    getOneProduct(@Payload() payload: AuctionProductDto): Promise<GetOneAuctionProductRes> {
        return this.onetimeProductsService.getOneProduct(payload);
    }

    @MessagePattern('/auction/products/create')
    create(data: CreateAuctionDto): Promise<CreateAuctionProductRes> {
        return this.onetimeProductsService.create(data);
    }
}
