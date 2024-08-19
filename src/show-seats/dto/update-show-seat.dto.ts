import { PartialType } from '@nestjs/swagger';
import { CreateShowSeatDto } from './create-show-seat.dto';

export class UpdateShowSeatDto extends PartialType(CreateShowSeatDto) {}
