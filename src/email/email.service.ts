import { MailerService } from '@nestjs-modules/mailer';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  bookingTemplate,
  recoveryPassTemplate,
  welcomeTemplate,
} from './templates/emailTemplates';
import { nameTransform } from './util/stringTransform';
import { DataMail } from './interface';
import { htmlTemplate } from './util/htmlTemplate';
import { async } from 'rxjs';

export interface DataBooking {
  boodingId: string;
  start_hour: string;
  movie_title: string;
  movie_date: string;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmail_Welcome(email: string, fullName: string) {
    try {
      let userName = nameTransform(fullName);

      let subjectString = `Hola ${userName}, Bienvenido a SlowMovies`;

      const html = welcomeTemplate(userName);

      await this.mailerService.sendMail({
        from: 'slowmoviessupport@gmail.com',
        to: email,
        subject: subjectString,
        html: html,
      });

      return;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async sendEmail_RecoveryPass(
    email: string,
    fullName: string,
    userId: string,
  ) {
    try {
      let userName = nameTransform(fullName);

      let subjectString = `Hola ${userName}, Recuperación de Contraseña`;

      const html = recoveryPassTemplate(userName, userId);

      await this.mailerService.sendMail({
        from: 'slowmoviessupport@gmail.com',
        to: email,
        subject: subjectString,
        html: html,
      });

      return {
        ok: 'true',
        status: '201',
        message: 'We have sent to you an email.!!',
      };
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  async sendEmail_booking(
    email: string,
    fullName: string,
    booking: DataBooking,
  ) {
    try {
      let userName = nameTransform(fullName);

      let subjectString = `Hola ${userName}, SlowMovies Booking`;

      const html = bookingTemplate(fullName, booking);

      await this.mailerService.sendMail({
        from: 'slowmoviessupport@gmail.com',
        to: email,
        subject: subjectString,
        html: html,
      });

      return;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
