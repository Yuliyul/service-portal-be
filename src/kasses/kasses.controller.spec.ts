import { Test, TestingModule } from '@nestjs/testing';
import { KassesController } from './kasses.controller';

describe('KassesController', () => {
  let controller: KassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KassesController],
    }).compile();

    controller = module.get<KassesController>(KassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
