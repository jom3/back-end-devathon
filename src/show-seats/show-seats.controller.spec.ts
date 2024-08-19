import { Test, TestingModule } from '@nestjs/testing';
import { ShowSeatsController } from './show-seats.controller';
import { ShowSeatsService } from './show-seats.service';

describe('ShowSeatsController', () => {
  let controller: ShowSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowSeatsController],
      providers: [ShowSeatsService],
    }).compile();

    controller = module.get<ShowSeatsController>(ShowSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
