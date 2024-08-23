import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/auth/util/bcryptjs';
import { PaginationDto } from 'src/common/dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser({ password, ...createUserDto }: CreateUserDto) {
    const passwordHashed = encryptPassword(password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          password: passwordHashed,
        },
      });

      //Creating Token
      const payload = { id: user.id, role: user.role };

      const token = await this.jwtService.signAsync(payload);

      return {
        status: 201,
        message: 'User created successfully',
        token,
      };
    } catch (err) {
      if(err instanceof PrismaClientKnownRequestError) {
        if(err.code === 'P2002') {
          throw new InternalServerErrorException(err);
        } 
     }  
     throw new InternalServerErrorException(err);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit = 3 } = paginationDto;
    const totalPages = await this.prismaService.user.count();
    const lastPage = Math.ceil(totalPages / limit);

    const data = await this.prismaService.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      metaData: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
      data: data,
    };
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return {
      status: '200 Ok',
      message: 'User found successfully',
      user: user,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    return {
      status: '200 Ok',
      message: 'User updated successfully',
      userInfo: updateUserDto,
    };
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.prismaService.user.findUnique({
        where: { id: id },
      });

      if (!deletedUser) {
        throw new NotFoundException(`User not found`);
      }

      await this.prismaService.user.delete({
        where: { id },
      });

      return {
        status: 204,
        message: 'User deleted successfully',
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      throw new InternalServerErrorException(
        `Failed to delete user: ${err.message}`,
      );
    }
  }

  async getCurrentUser(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
