import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailDto, LoginDto, PasswordDto } from './dto';
import { comparePassword, encryptPassword } from './util/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async login({ email, password }: LoginDto) {
    let user: { id: string; password: string; role: string };

    try {
      //Searching user
      user = await this.prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          password: true,
          role: true,
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
    const payload = { id: user.id, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
    };
  }

  //Recovery password
  async createEmailToken({email}: EmailDto){
    let user: {id: string, email: string, fullName: string};    
    try {
      user = await this.prisma.user.findUnique({
        where: {
            email,
        },
        select: {
          id: true,
          email: true,
          fullName: true
        } 
      });

    if(!user){
      throw new UnauthorizedException("Invalidad Email")
    }

    //Creating new Token
    const id = user.id
    
    //Send Email: read .env.example to use it.
    await this.emailService.sendEmail_RecoveryPass(user.email,user.fullName,id);

    // return response;
    return {
      ok: "true",
      status: "201",
      message: "We have sent you an email to recovery your password.!!"
    };

    } catch (error) {
      throw new NotFoundException(error.message);
    }

  }

  async resetPassword({newPassword, newConfirmPassword}: PasswordDto, userId: string ){
  const passwordHashed = encryptPassword(newPassword);
  try {
    
    if(newPassword !== newConfirmPassword){
      throw new HttpException("Password are different", HttpStatus.NOT_FOUND)
    }

    await this.prisma.user.update({
      where: {id: userId},
      data: {password: passwordHashed},
    });

    return {
      ok: "true",
      status: "201",
      message: "Your Password has been chanced!!"
    }
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
  }

  // Oauth2.0 ~ Google
  async googleLogin(req: { user: any; }) {
    try {
      if (!req.user) {
        return 'No user from google'
      }
  
      return {
        message: 'User information from google',
        user: req.user
      }  
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
