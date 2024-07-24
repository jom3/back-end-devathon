import { Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prisma:PrismaService
  ){}
  async use(req: Request, res: Response, next: NextFunction) {

    //Get email
    
    const {email, password, confirm_password } = req.body;

    //Search Email into the database
    const emailFound = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //User Found
    if(emailFound){
      return res.status(404).json({
        message: "Email is already exists"
      });
    }

    //Checking Passwords
    if(password !== confirm_password){
      return res.status(404).json({
        message: "Password are different"
      });
    }

    next();
  }
}
