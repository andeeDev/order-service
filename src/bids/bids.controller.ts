import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Bid } from '@prisma/client';
import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/CreateBidDto';

@Controller('auction/bids')
export class BidsController {
    constructor(private readonly bidsService: BidsService) {}

    @MessagePattern('/auction/products/bids')
    getAll(@Payload() { id: productId }): Promise<Bid[]> {
        return this.bidsService.getAll(productId);
    }

    @MessagePattern('/auction/products/bids/create')
    createBid(@Payload() data: CreateBidDto): Promise<Bid> {
        return this.bidsService.create(data);
    }
}
