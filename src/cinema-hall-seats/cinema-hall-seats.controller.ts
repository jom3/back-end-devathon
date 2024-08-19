import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CinemaHallSeatsService } from './cinema-hall-seats.service';
import { CreateCinemaHallSeatDto } from './dto/create-cinema-hall-seat.dto';
import { UpdateCinemaHallSeatDto } from './dto/update-cinema-hall-seat.dto';

@Controller('cinema-seats')
export class CinemaHallSeatsController {
  constructor(
    private readonly cinemaHallSeatsService: CinemaHallSeatsService,
  ) {}

  @Post()
  create(@Body() createCinemaHallSeatDto: CreateCinemaHallSeatDto) {
    return this.cinemaHallSeatsService.create(createCinemaHallSeatDto);
  }

  @Get()
  findAll() {
    return this.cinemaHallSeatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaHallSeatsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCinemaHallSeatDto: UpdateCinemaHallSeatDto,
  ) {
    return this.cinemaHallSeatsService.update(+id, updateCinemaHallSeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaHallSeatsService.remove(+id);
  }
}
