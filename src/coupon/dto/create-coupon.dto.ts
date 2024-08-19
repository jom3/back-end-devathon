import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({
    type: String,
    description: 'Coupon code',
    example: '10OFF',
  })
  @IsString()
  public couponId: string;

  @ApiProperty({
    type: Number,
    description: 'Coupon discount',
    example: 10,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  public discount: number;

  @ApiProperty({
    type: Date,
    description: 'Coupon expiration date',
    example: '2022-01-01',
  })
  @Min(0)
  @IsPositive()
  @IsDate()
  public expires_at: Date;

  @ApiProperty({
    type: Date,
    description: 'Coupon create date',
    example: '2022-01-01',
  })
  @Min(0)
  @IsPositive()
  @IsDate()
  public create_at: Date;

  @ApiProperty({
    type: Boolean,
    description: 'Coupon state',
    example: true,
  })
  @IsBoolean()
  public used: boolean;

  @ApiProperty({
    type: String,
    description: 'Coupon state',
    example: '',
  })
  @IsInt()
  public state: number;
}
