import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('nodemailer_host'),
          secure: false,
          auth: {
            user: configService.get('nodemailer_user'),
            pass: configService.get('nodemailer_password'),
          },
        },
        defaults: {
          from: `No Replay: <${configService.get('nodemailer_email_from')}>`,
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [EmailController],
  providers: [EmailService, ConfigService, PrismaService, ConfigService],
  exports: [EmailService],
})
export class EmailModule {}
