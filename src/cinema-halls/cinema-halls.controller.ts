import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CinemaHallsService } from './cinema-halls.service';
import { CreateCinemaHallDto } from './dto/create-cinema-hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema-hall.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cinema-halls')
@Controller('cinema-halls')
export class CinemaHallsController {
  constructor(private readonly cinemaHallsService: CinemaHallsService) {}

  @Post()
  create(@Body() createCinemaHallDto: CreateCinemaHallDto) {
    return this.cinemaHallsService.create(createCinemaHallDto);
  }

  @Get()
  findAll() {
    return this.cinemaHallsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaHallsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCinemaHallDto: UpdateCinemaHallDto,
  ) {
    return this.cinemaHallsService.update(+id, updateCinemaHallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaHallsService.remove(+id);
  }
}
