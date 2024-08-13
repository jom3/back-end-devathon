import { IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "./enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({
    description: 'user identity',
    example: '4445545',
  })
  @IsString()
  @IsNotEmpty()
  readonly dni: string;


  @ApiProperty({
    description: 'user name',
    example: 'john cena',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;


  @IsString()
  readonly role: UserRole.USER;


  @ApiProperty({
    description: 'optional user identification',
    example: 'jhoncena@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
  

  @ApiProperty({
    description: 'secret key',
    example: '**********',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
  
}
