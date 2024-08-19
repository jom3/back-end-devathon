import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showsService.create(createShowDto);
  }

  @Get()
  findAll() {
    return this.showsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showsService.update(+id, updateShowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showsService.remove(+id);
  }

  @Get('search/:query')
  search(@Param('query') query: number) {
    return this.showsService.search(query);
  }

  @Get('showSeatsAvailable/:id')
  showSeatsAvailable(@Param('id') id: number) {
    return this.showsService.showSeatsAvailableByShowId(+id);
  }

  @Get('showSeatsNotAvailable/:id')
  showSeatsNotAvailableByShowId(@Param('id') id: number) {
    return this.showsService.showSeatsNotAvailableByShowId(id);
  }

  @Get('getShowSeatsPricesByShow/:id')
  getShowSeatsPricesByShow(@Param('id') id: number) {
    return this.showsService.getShowSeatsPricesByShow(id);
  }

  @Patch('updateSeatStatus/:id')
  updateSeatStatus(@Param('id') id: string, @Body() data: any) {
    return this.showsService.updateSeatStatus(id, data);
  }
}
