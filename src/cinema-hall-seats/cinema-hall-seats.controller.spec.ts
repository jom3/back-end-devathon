import { Test, TestingModule } from '@nestjs/testing';
import { CinemaHallSeatsController } from './cinema-hall-seats.controller';
import { CinemaHallSeatsService } from './cinema-hall-seats.service';

describe('CinemaHallSeatsController', () => {
  let controller: CinemaHallSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CinemaHallSeatsController],
      providers: [CinemaHallSeatsService],
    }).compile();

    controller = module.get<CinemaHallSeatsController>(CinemaHallSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
