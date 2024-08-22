import { MailerService } from '@nestjs-modules/mailer';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { EmailService } from './email.service';

@Controller('emails')
export class EmailsController {
  constructor(private readonly mailService: EmailService) {}

  @Post()
  create(@Body() data: any) {
    return this.mailService.sendEmail_Welcome(data.email, data.fullName);
  }

  @Post('confirm')
  confirm(@Body() data: any) {
    return this.mailService.sendEmail_booking(data.email, data.fullName, data);
  }
}
