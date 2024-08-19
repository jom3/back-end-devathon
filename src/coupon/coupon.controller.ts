import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.getCoupons();
  }

  @Get(':couponId')
  findOne(@Param('couponId') id: string) {
    return this.couponService.getCouponById(id);
  }

  @Patch(':couponId')
  update(
    @Param('couponId') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    return this.couponService.updateCoupon(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('couponId') id: string) {
    return this.couponService.deleteCoupon(id);
  }
}
