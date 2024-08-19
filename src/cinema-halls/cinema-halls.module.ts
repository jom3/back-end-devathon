import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CinemaHallsController } from './cinema-halls.controller';
import { CinemaHallsService } from './cinema-halls.service';

@Module({
  controllers: [CinemaHallsController],
  providers: [CinemaHallsService, PrismaService],
})
export class CinemaHallsModule {}
