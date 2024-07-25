import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { CouponModule } from './coupon/coupon.module';
import configuration from './config/configuration';
import { PrismaService } from './prisma/prisma.service';
import { CouponService } from './coupon/coupon.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    MovieModule,
    CouponModule,
  ],
  providers: [AppService, PrismaService, CouponService],
})
export class AppModule {}
