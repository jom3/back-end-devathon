import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CinemaHallSeatsController } from './cinema-hall-seats.controller';
import { CinemaHallSeatsService } from './cinema-hall-seats.service';

@Module({
  controllers: [CinemaHallSeatsController],
  providers: [CinemaHallSeatsService, PrismaService],
})
export class CinemaHallSeatsModule {}
