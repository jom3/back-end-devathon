import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  create(createBookingDto: any) {
    let showID = createBookingDto.showID;
    let userID = createBookingDto.userID;
    let numberOfSeats = createBookingDto.seats;

    let result = this.prisma
      .$queryRaw`INSERT INTO "Booking" ("bookingID", "numberOfSeat", "timestamp","status",  "userID","showID" ) VALUES (DEFAULT, ${numberOfSeats}, CURRENT_TIMESTAMP, 'CONFIRMADO', ${userID}, ${showID} ) RETURNING "bookingID"`;
    console.log(result);
    return result;
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
