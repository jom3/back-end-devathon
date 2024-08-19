import { Test, TestingModule } from '@nestjs/testing';
import { ShowSeatsService } from './show-seats.service';

describe('ShowSeatsService', () => {
  let service: ShowSeatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShowSeatsService],
    }).compile();

    service = module.get<ShowSeatsService>(ShowSeatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
