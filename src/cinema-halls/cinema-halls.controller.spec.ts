import { Test, TestingModule } from '@nestjs/testing';
import { CinemaHallsController } from './cinema-halls.controller';
import { CinemaHallsService } from './cinema-halls.service';

describe('CinemaHallsController', () => {
  let controller: CinemaHallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CinemaHallsController],
      providers: [CinemaHallsService],
    }).compile();

    controller = module.get<CinemaHallsController>(CinemaHallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
