import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/CreateBidDto';
import { CreateBidRes, FetchAllBidsRes } from '../utils/types/ReturnTypes';

@Controller('auction/bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @MessagePattern('/auction/products/bids')
    getAll(@Payload() { id: productId }): Promise<FetchAllBidsRes> {
        return this.bidsService.getAll(productId);
    }

    @MessagePattern('/auction/products/bids/create')
    createBid(@Payload() data: CreateBidDto): Promise<CreateBidRes> {
        return this.bidsService.create(data);
    }
}
