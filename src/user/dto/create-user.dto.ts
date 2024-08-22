import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from './enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'user identity',
    example: '4445545',
  })
  @IsString()
  @IsOptional()
  readonly dni: string;

  @ApiProperty({
    description: 'user name',
    example: 'john cena',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    description: 'user phone',
    example: '555 -xxxxx-xxxx',
  })
  @IsString()
  @IsOptional()
  readonly phone: string;

  @ApiProperty({
    description: 'user gender',
    example: 'M - F - O - N',
  })
  @IsString()
  @IsOptional()
  readonly genre?: string;

  @IsString()
  @IsOptional()
  readonly role: UserRole.USER;

  @ApiProperty({
    description: 'user country',
    example: 'Colombia',
  })
  @IsString()
  @IsOptional()
  readonly country: string;

  @ApiProperty({
    description: 'optional user identification',
    example: 'jhoncena@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'secret key',
    example: '**********',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
