import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCinemaDto {
  //   @IsNumber()
  //   @IsNotEmpty()
  //   readonly cinemaID: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;
}
