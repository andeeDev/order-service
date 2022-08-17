import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BidTaskService {
    private readonly logger = new Logger(BidTaskService.name);

    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron(): void {
        this.logger.debug('Called every 10 seconds');
    }
}
