import {
  BadRequestException,
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
import { EmailService } from 'src/email/email.service';
import { OAuth2Client } from 'google-auth-library';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService,
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
          fullName: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalidad Email');
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
        ok: 'true',
        status: '201',
        message: 'Your Password has been changed!!',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Oauth2.0 ~ Google
  async googleLogin(req: { user: any }) {
    try {
      if (!req.user) {
        throw new BadRequestException('Unauthenticated');
      }

      return {
        message: 'User information from google',
        user: req.user,
      };
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async googleLoginValidate(data: any) {
    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const clientValidateToken = new OAuth2Client(googleClientId);
    try {
      const verifytoken = await clientValidateToken.verifyIdToken({
        idToken: data,
        audience: googleClientId,
      });

      if (!verifytoken) {
        throw new HttpException(
          'Token no válido o ha expirado',
          HttpStatus.FORBIDDEN,
        );
      }

      const userInfo = verifytoken.getPayload();
      return userInfo;
    } catch (err) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async registerUserFromGoogle(data: any) {
    const { email, name } = data;
    const password = this.passwordService.generateRandomPassword(8); // Generate random password
    const passwordHashed = encryptPassword(password);
    const userExists = await this.findUserByEmail(email);

    if (userExists) {
      const data = await this.gererateTokenJwt(userExists);
      return {
        message: 'User already exists',
        data,
      };
    } else {
      try {
        const user = await this.prisma.user.create({
          //TODO: Validar este Registro.
          data: {
            email,
            password: passwordHashed,
            dni: null,
            fullName: name,
          },
        });
        return {
          message: 'User has been created!!',
          token: await this.gererateTokenJwt(user),
        };
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async gererateTokenJwt(user: any) {
    const payload = {
      id: user.id,
      role: user.role,
      user: user.fullName,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    return {
      token,
    };
  }
}
