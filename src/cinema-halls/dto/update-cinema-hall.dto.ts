import { PartialType } from '@nestjs/swagger';
import { CreateCinemaHallDto } from './create-cinema-hall.dto';

export class UpdateCinemaHallDto extends PartialType(CreateCinemaHallDto) {}
