import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowSeatsService } from './show-seats.service';
import { CreateShowSeatDto } from './dto/create-show-seat.dto';
import { UpdateShowSeatDto } from './dto/update-show-seat.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Show-seats')
@Controller('show-seats')
export class ShowSeatsController {
  constructor(private readonly showSeatsService: ShowSeatsService) {}

  @Post()
  create(@Body() createShowSeatDto: CreateShowSeatDto) {
    return this.showSeatsService.create(createShowSeatDto);
  }

  @Get()
  findAll() {
    return this.showSeatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showSeatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowSeatDto: UpdateShowSeatDto) {
    return this.showSeatsService.update(+id, updateShowSeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showSeatsService.remove(+id);
  }
}
