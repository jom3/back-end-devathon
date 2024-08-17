import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService :ConfigService) => ({
        transport: {
          host: configService.get("nodemailer_host"),
          secure: false,
          auth: {
            user: configService.get("nodemailer_user"),
            pass: configService.get("nodemailer_password")
          }
        },
        defaults: {
          from: `No Reply: <${configService.get("nodemailer_email_from")}>`
        }
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [EmailService, ConfigService],
  exports: [EmailService]
})
export class EmailModule {}
