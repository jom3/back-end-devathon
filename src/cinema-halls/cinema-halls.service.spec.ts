import { Test, TestingModule } from '@nestjs/testing';
import { CinemaHallsService } from './cinema-halls.service';

describe('CinemaHallsService', () => {
  let service: CinemaHallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CinemaHallsService],
    }).compile();

    service = module.get<CinemaHallsService>(CinemaHallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
