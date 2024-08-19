import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCouponDto } from './dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

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
      where: { couponId: id },
    });
  }

  //async updateCoupon(id: string, data: Partial<{ code: string; discount: number; expires_at: Date }>) {
  async updateCoupon(id: string, data: Partial<UpdateCouponDto>) {
    return this.prisma.coupon.update({
      where: { couponId: id },
      data,
    });
  }

  async deleteCoupon(id: string) {
    return this.prisma.coupon.delete({
      where: { couponId: id },
    });
  }
}
