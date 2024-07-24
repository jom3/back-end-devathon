import { IsEmail, IsString, MinLength } from "class-validator";
import { IsStrongPassword } from "../util/password.validator";

export class LoginDto {
    @IsEmail()
    email: string;
    
    @IsStrongPassword()
    password: string;
}