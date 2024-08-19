import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCinemaHallDto } from './dto/create-cinema-hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema-hall.dto';

@Injectable()
export class CinemaHallsService {
  constructor(private prisma: PrismaService) {}

  create(createCinemaHallDto: CreateCinemaHallDto) {
    return 'This action adds a new cinemaHall';
  }

  findAll() {
    return this.prisma.cinemaHall.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cinemaHall`;
  }

  update(id: number, updateCinemaHallDto: UpdateCinemaHallDto) {
    return `This action updates a #${id} cinemaHall`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinemaHall`;
  }
}
