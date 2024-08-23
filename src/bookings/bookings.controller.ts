import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('payed')
  getAllPayedBookings() {
    return this.bookingsService.getAllPayedBookings();
  }

  @Get(':userID/:showID')
  getEmailConfirmation(
    @Param('userID') userID: string,
    @Param('showID') showID: number,
  ) {
    return this.bookingsService.getEmailConfirmation(userID, showID);
  }

  @Post()
  create(@Body() data: any) {
    return this.bookingsService.create(data);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  @Get()
  getAllBookings() {
    return this.bookingsService.findAll();
  }
}
