import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @IsString()
  readonly role: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
    
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  
}
