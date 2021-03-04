import { Test, TestingModule } from '@nestjs/testing';
import { KassesService } from './kasses.service';

describe('KassesService', () => {
  let service: KassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KassesService],
    }).compile();

    service = module.get<KassesService>(KassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
