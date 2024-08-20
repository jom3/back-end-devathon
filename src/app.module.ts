import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { BookingsModule } from './bookings/bookings.module';
import { CinemaHallSeatsModule } from './cinema-hall-seats/cinema-hall-seats.module';
import { CinemaHallsModule } from './cinema-halls/cinema-halls.module';
import { CinemasModule } from './cinemas/cinemas.module';
import configuration from './config/configuration';
import { CouponModule } from './coupon/coupon.module';
import { CouponService } from './coupon/coupon.service';
import { EmailModule } from './email/email.module';
import { MovieModule } from './movie/movie.module';
import { MovieService } from './movie/movie.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ShowSeatsModule } from './show-seats/show-seats.module';
import { ShowsModule } from './shows/shows.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PasswordService } from './auth/password.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    CouponModule,
    MovieModule,
    CinemasModule,
    CinemaHallsModule,
    CinemaHallSeatsModule,
    ShowsModule,
    BookingsModule,
    ShowSeatsModule,
    EmailModule,
  ],

  providers: [
    AppService,
    PrismaService,
    CouponService,
    AuthService,
    UserService,
    MovieService,
    ConfigService,
    GoogleStrategy,
    PasswordService
  ],
})
export class AppModule {}
