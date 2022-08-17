import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OnetimeProductsService } from './onetime-products.service';
import { OnetimeProductsController } from './onetime-products.controller';

@Module({
    imports: [PrismaModule],
    providers: [OnetimeProductsService],
    exports: [OnetimeProductsService],
    controllers: [OnetimeProductsController],
})
export class OnetimeProductsModule {}
