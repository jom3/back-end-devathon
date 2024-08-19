import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCinemaHallSeatDto } from './dto/create-cinema-hall-seat.dto';
import { UpdateCinemaHallSeatDto } from './dto/update-cinema-hall-seat.dto';

@Injectable()
export class CinemaHallSeatsService {
  constructor(private prisma: PrismaService) {}

  create(createCinemaHallSeatDto: CreateCinemaHallSeatDto) {
    return 'This action adds a new cinemaHallSeat';
  }

  findAll() {
    return this.prisma.cinemaSeat.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cinemaHallSeat`;
  }

  update(id: number, updateCinemaHallSeatDto: UpdateCinemaHallSeatDto) {
    return `This action updates a #${id} cinemaHallSeat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinemaHallSeat`;
  }
}
