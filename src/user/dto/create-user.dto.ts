import { IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "./enum";

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly dni: string;

  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  readonly role: UserRole.USER;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
    
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly coupon: string;
  
}
