import { Injectable } from '@nestjs/common';
import { CreateShowSeatDto } from './dto/create-show-seat.dto';
import { UpdateShowSeatDto } from './dto/update-show-seat.dto';

@Injectable()
export class ShowSeatsService {
  create(createShowSeatDto: CreateShowSeatDto) {
    return 'This action adds a new showSeat';
  }

  findAll() {
    return `This action returns all showSeats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} showSeat`;
  }

  update(id: number, updateShowSeatDto: UpdateShowSeatDto) {
    return `This action updates a #${id} showSeat`;
  }

  remove(id: number) {
    return `This action removes a #${id} showSeat`;
  }
}
