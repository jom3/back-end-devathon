import { ShowSeat } from './../show-seats/entities/show-seat.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Prisma } from '@prisma/client';

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

        this.prisma
          .$executeRawUnsafe(`UPDATE "ShowSeat" SET "status" = 'OCUPADA' , "bookingID" = currval('"Booking_bookingID_seq"') 
        WHERE "cinemaSeatID"  in (${numberOfSeats}) and "showID" = ${showID}`),
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

  async getAllPayedBookings() {
    return this.prisma.$queryRaw`select DISTINCT "User"."fullName", 

    "Booking"."bookingID",
    "Booking"."numberOfSeat" as "nbutaca", 
    "Booking"."status" as "estado",
    "Payment"."amount" as "monto", 
    "Show"."showID",
    "Movie"."title", 
    to_char("Show"."date",'DD-MM-YYYY') as "freserva", 
    to_char("Show"."startTime",'HH24:MI') as "horapelicula"
 from "Booking"
 inner join "Payment" on "Payment"."bookingID" = "Booking"."bookingID"
 inner join "User" on "User"."id" =  "Booking"."userID"
 inner join "ShowSeat" on "ShowSeat"."bookingID" = "Booking"."bookingID"
 inner join "Show" on "ShowSeat"."showID" = "Show"."showID"
 inner join "Movie" on "Movie"."movieID" = "Show"."movieID"
`;
  }

  async getEmailConfirmation(userID: string, showID: number) {
    return this.prisma.$queryRaw`select DISTINCT "User"."fullName", 
    "Booking"."bookingID",
    "Booking"."numberOfSeat" as "nbutaca", 
    "Show"."showID",

    "Booking"."status" as "estado",
    "Payment"."amount" as "monto", 
    "Movie"."title", 
    to_char("Show"."date",'DD-MM-YYYY') as "freserva", 
    to_char("Show"."startTime",'HH24:MI') as "horapelicula"
 from "Booking"
 inner join "Payment" on "Payment"."bookingID" = "Booking"."bookingID"
 inner join "User" on "User"."id" =  "Booking"."userID"
 inner join "ShowSeat" on "ShowSeat"."bookingID" = "Booking"."bookingID"
 inner join "Show" on "ShowSeat"."showID" = "Show"."showID"
 inner join "Movie" on "Movie"."movieID" = "Show"."movieID"
 where  "User"."id" = ${userID} AND "Show"."showID" = CAST(${showID} as integer)`;
  }
}
