import { PartialType } from '@nestjs/swagger';
import { CreateCinemaHallSeatDto } from './create-cinema-hall-seat.dto';

export class UpdateCinemaHallSeatDto extends PartialType(CreateCinemaHallSeatDto) {}
