import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CreateCouponDto {

    @ApiProperty({ 
        type: String,
        description: 'Coupon code',
        example: '10OFF' 
    })
    @IsString()
    public code: string;


    @ApiProperty({ 
        type: Number,
        description: 'Coupon discount',
        example: 10 
    })
    @IsInt()
    @Min(0)
    @Type(() => Number)
    public discount: number;


    @ApiProperty({ 
        type: String,
        description: 'Coupon type',
        example: 'percent'
    })
    @IsString()
    @Min(0)
    @IsPositive()
    public type: string;


    @ApiProperty({ 
        type: Date,
        description: 'Coupon expiration date',
        example: '2022-01-01' 
    })
    @Min(0)
    @IsPositive()
    @IsDate()
    public expires_at: Date;


    @ApiProperty({ 
        type: Boolean,
        description: 'Coupon state',
        example: true 
    })
    @IsString()
    @IsNotEmpty()
    public used: boolean;


    @ApiProperty({
        type: String,
        description: 'Id of the user who created the coupon',
        example: '11111'
    })
    @IsString()
    @IsNotEmpty()
    public userId: string;

}
