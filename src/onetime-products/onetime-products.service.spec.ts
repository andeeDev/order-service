import { Test, TestingModule } from '@nestjs/testing';
import { OnetimeProductsService } from './onetime-products.service';

describe('OnetimeProductsService', () => {
    let service: OnetimeProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OnetimeProductsService],
        }).compile();

        service = module.get<OnetimeProductsService>(OnetimeProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
