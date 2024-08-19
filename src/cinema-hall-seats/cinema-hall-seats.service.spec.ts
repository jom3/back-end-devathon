import { Test, TestingModule } from '@nestjs/testing';
import { CinemaHallSeatsService } from './cinema-hall-seats.service';

describe('CinemaHallSeatsService', () => {
  let service: CinemaHallSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CinemaHallSeatsService],
    }).compile();

    service = module.get<CinemaHallSeatsService>(CinemaHallSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
