import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Injectable()
export class CinemasService {
  constructor(private prisma: PrismaService) {}

  create(createCinemaDto: CreateCinemaDto) {
    return this.prisma.cinema.create({ data: createCinemaDto });
    // try {
    //   this.prisma.cinema.create({ data: createCinemaDto });

    //   return {
    //     status: 201,
    //     message: 'Cienema created successfully',
    //   };
    // } catch (err) {
    //   throw new Error(err);
    // }
  }

  findAll() {
    return this.prisma.cinema.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cinema`;
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return `This action updates a #${id} cinema`;
  }

  remove(id: number) {
    return `This action removes a #${id} cinema`;
  }
}
