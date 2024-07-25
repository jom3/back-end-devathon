import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';
import { comparePassword } from '../util/bcryptjs';

@Injectable()
export class LoginMiddleware implements NestMiddleware {
  constructor(
    private prisma:PrismaService
  ){}
  async use(req: Request, res: Response, next: NextFunction) {

    //Get email
    
    const {email,password} = req.body;

    //Search Email into the database
    const userFound = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //User Found
    if(!userFound){
      return res.status(404).json({
        message: "Wrong Email"
      });
    }

    //Wrong Password 
    //PasswordHashed
    const passwordHashed = userFound.password;
    //Compare Password
    const passwor_IsCorrect = await comparePassword(password,passwordHashed);

    if(!passwor_IsCorrect){
      return res.status(404).json({
        message: "Wrong Password"
      });
    }

    next();
  }
}
