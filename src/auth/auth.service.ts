import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto';
import { comparePassword, encryptPassword } from './util/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create({ password, ...createUserDto }: CreateUserDto) {
    const passwordHashed = encryptPassword(password);
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password: passwordHashed,
        },
      });

      //Creating Token
      const payload = { id: userCreated.id };

      const token = await this.jwtService.signAsync(payload);

      return {
        token,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new NotFoundException('Email invalid');
        }
      }

      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, password }: LoginDto) {
    let user: { id: string; password: string };

    try {
      //Searching user
      user = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          password: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Invalid Credentials');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordCorrect = comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    //Creating Token
    const payload = { id: user.id };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }
}
