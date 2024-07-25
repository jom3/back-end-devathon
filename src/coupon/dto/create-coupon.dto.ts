import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

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
    //@IsPositive()
    @Type(() => Number)
    public discount: number;


    @ApiProperty({ 
        type: Date,
        description: 'Coupon expiration date',
        example: '2022-01-01' 
    })
    @IsDate()
    public expires_at: Date;


    @ApiProperty({ 
        type: String,
        description: 'Coupon state',
        example: 'active' 
    })
    @IsString()
    @IsNotEmpty()
    public state: string;
}
