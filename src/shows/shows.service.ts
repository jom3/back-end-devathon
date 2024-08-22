import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';

@Injectable()
export class ShowsService {
  constructor(private prisma: PrismaService) {}

  create(createShowDto: CreateShowDto) {
    return 'This action adds a new show';
  }

  findAll() {
    return this.prisma.show.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} show`;
  }

  update(id: number, updateShowDto: UpdateShowDto) {
    return `This action updates a #${id} show`;
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }

  async search(movie: any) {
    const movieID = parseInt(movie);
    return this.prisma.$queryRaw`      select
        "Show"."showID",
        "Movie"."movieID",
        "Movie"."title",
        "Movie"."desc" as "desc",
        "Cinema"."name" as "cine",
        "CinemaHall"."name" as "sala",
        "CinemaHall"."totalSeats" as "butacas",
        TRIM(to_char("Show"."startTime",'MONTH')) as "mesInicio",
        to_char("Show"."startTime", 'DD') as "diaInicio",
         to_char("Show"."startTime", 'HH24:MI') as "inicio",
        to_char("Show"."endTime", 'HH24:MI') as "horaFin",
         to_char("Show"."endTime", 'DD-MM-YYYY hh:mm:ss') as "fin"
        from
        "CinemaHall"
        inner join "Show" on "Show"."cinemaHall" = "CinemaHall"."cinemaHallID"
        inner join "Movie" on "Movie"."movieID" = "Show"."movieID"
         inner join "Cinema" on "Cinema"."cinemaID" = "CinemaHall"."cinemaID"
        AND
        "Show"."date" >= CURRENT_DATE
        and "Movie"."externalID"  = ${movieID}
        `;
  }

  async showSeatsAvailableByShowId(id: any) {
    return this.prisma.$queryRaw`select
        "CinemaSeat"."type",CAST (count ("ShowSeat"."showSeatID") as integer) as "disponibles"
        from "ShowSeat"
        inner join "CinemaSeat" 
        on "CinemaSeat"."cinemaSeatID" = "ShowSeat"."cinemaSeatID"
         WHERE "showID" = ${id} and "ShowSeat".status = 'LIBRE'
         group by "CinemaSeat"."type"`;
  }

  async showSeatsNotAvailableByShowId(id: number) {
    return this.prisma.$queryRaw`select
        "CinemaSeat"."type", "ShowSeat"."status" , "ShowSeat"."showID", "CinemaSeat"."cinemaSeatID"  from "ShowSeat"
        inner join "CinemaSeat" 
        on "CinemaSeat"."cinemaSeatID" = "ShowSeat"."cinemaSeatID"
         WHERE "ShowSeat"."showID" = CAST(${id} as integer)  and "ShowSeat".status = 'OCUPADA'
     `;
  }

  async getShowSeatsPricesByShow(id: number) {
    return this.prisma
      .$queryRaw`select  "ShowSeat"."price",  "CinemaSeat"."type"
FROM "ShowSeat"
INNER JOIN "CinemaSeat" ON
"CinemaSeat"."cinemaSeatID" = "ShowSeat"."cinemaSeatID"
where "ShowSeat"."showID" =  CAST(${id} as integer)
GROUP BY "ShowSeat"."price", "CinemaSeat"."type"
         `;
  }

  async updateSeatStatus(seatNumber, body) {
    let seats = body.seats;
    let showId = body.showID;

    return this.prisma.showSeat.updateMany({
      where: {
        cinemaSeatID: {
          in: seats,
        },
        showID: {
          equals: showId,
        },
      },
      data: {
        status: 'OCUPADA',
      },
    });
  }

  private async updateStatus(seatNumber: number, showId: number) {
    this.prisma
      .$queryRaw`UPDATE "ShowSeat" SET "status" = 'OCUPADA' WHERE "showID" = ${showId} and "cinemaSeatID" = ${seatNumber};`;
  }
}
