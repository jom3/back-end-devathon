import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CouponModule } from './coupon/coupon.module';
import configuration from './config/configuration';
import { PrismaService } from './prisma/prisma.service';
import { CouponService } from './coupon/coupon.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    UserModule,
    CouponModule,
    EmailModule,
  ],
  providers: [AppService, PrismaService, CouponService, AuthService, UserService, GoogleStrategy],
})
export class AppModule {}
