import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CouponService {

  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCouponDto) {
    return this.prisma.coupon.create({
      data,
    });
  }

  async getCoupons() {
    return this.prisma.coupon.findMany();
  }

  async getCouponById(id: string) {
    return this.prisma.coupon.findUnique({
      where: { id },
    });
  }

  //async updateCoupon(id: string, data: Partial<{ code: string; discount: number; expires_at: Date }>) {
  async updateCoupon(id: string, data: Partial<UpdateCouponDto>) {
    return this.prisma.coupon.update({
      where: { id },
      data,
    });
  }

  async deleteCoupon(id: string) {
    return this.prisma.coupon.delete({
      where: { id },
    });
  }
}
