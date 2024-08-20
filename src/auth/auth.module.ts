import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';

@Module({
  providers: [AuthService, PrismaService, EmailService, PasswordService],
  controllers: [AuthController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
