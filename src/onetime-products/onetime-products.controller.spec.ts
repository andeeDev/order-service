import { Test, TestingModule } from '@nestjs/testing';
import { OnetimeProductsController } from './onetime-products.controller';

describe('OnetimeProductsController', () => {
    let controller: OnetimeProductsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OnetimeProductsController],
        }).compile();

        controller = module.get<OnetimeProductsController>(OnetimeProductsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
