import { ShowSeat } from './../show-seats/entities/show-seat.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: any) {
    let showID = createBookingDto.showID;
    let userID = createBookingDto.userID;
    let numberOfSeats = createBookingDto.seats;
    let total = createBookingDto.total;

    try {
      const [
        inserBooking,
        updateShowSeatStatus,
        insertPayment,
        updateBookingAfterSuccess,
      ] = await this.prisma.$transaction([
        this.prisma.$queryRaw`INSERT INTO  "Booking"
  ("numberOfSeat","timestamp","status","userID","showID")
  values (${numberOfSeats},CURRENT_TIMESTAMP,'NO_CONFIRMADO',${userID},${showID})RETURNING  "bookingID"`,
        this.prisma
          .$queryRaw`INSERT INTO "Payment" ( "amount", "bookingID","discountCouponID","timestamp") VALUES ( ${total}, currval('"Booking_bookingID_seq"') , 1, CURRENT_TIMESTAMP)`,
        this.prisma
          .$queryRaw`UPDATE "Booking" SET "status" = 'CONFIRMADO' WHERE "bookingID" = currval('"Booking_bookingID_seq"')`,

        this.prisma.showSeat.updateMany({
          where: {
            cinemaSeatID: {
              in: numberOfSeats,
            },
            showID: {
              equals: showID,
            },
            status: {
              not: 'OCUPADA',
            },
          },
          data: {
            status: 'OCUPADA',
          },
        }),
      ]);
    } catch (error) {
      throw new Error(error);
    }
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

  makePayment(id: number) {}
}
