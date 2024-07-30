import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    example: 'jhoncena@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Password must contain min 8 character at least 1 uppercase, 1 lowercase, 1 number and 1 special character (@$!%*?&.)",
    example: "jhonCena.1234"
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
