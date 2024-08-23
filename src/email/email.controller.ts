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

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.sendEmail_booking(data.email, data.fullName, data);
  }
}
