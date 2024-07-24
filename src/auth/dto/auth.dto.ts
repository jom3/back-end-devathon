import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsStrongPassword } from "../util/password.validator";

export class CreateUserDto {
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    fullName: string;
    
    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsString()
    @MinLength(8)
    @Transform(({value}) => value.trim())
    confirm_password: string;
}