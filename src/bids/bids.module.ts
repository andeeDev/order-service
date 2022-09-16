import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BidTaskService } from './bid-task.service';

@Module({
    imports: [PrismaModule, ScheduleModule.forRoot()],
    providers: [BidsService, BidTaskService],
    exports: [BidsService],
    controllers: [BidsController],
})
export class BidsModule {}
