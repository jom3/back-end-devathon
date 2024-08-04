import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { encryptPassword } from 'src/auth/util/bcryptjs';

@Injectable()
export class UserService {

  constructor(private readonly prismaService: PrismaService) {}

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
      //const payload = { id: user.id, role: user.role };

     // const token = await this.jwtService.signAsync(payload);

      return {
        user,
      };
    }
    catch (err) {
      throw new Error(err);
    }
  }


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
