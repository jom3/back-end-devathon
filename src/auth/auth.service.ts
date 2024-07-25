import { HttpException, HttpStatus, Injectable, NotFoundException, Req, Res} from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto';
import { encryptPassword} from './util/bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ){}
   
    async createUser(User: CreateUserDto, @Req() req:Request, @Res() res:Response){
        try {
            const {fullName, email, password} = await User;

            //Hashing Password
            const passwordHashed = await encryptPassword(password);

            //Creating: User
            const userCreated = await this.prisma.user.create({
                data: {
                    fullName: fullName,
                    email: email,
                    password: passwordHashed,
                }
            })

            //Creating Token
            const payload = {id: userCreated.id}
            const token = await this.jwtService.signAsync(payload);

            //Creating Cookie
            res.cookie(process.env.authToken, token);
            
            return "User was successfully created";
        } catch (error) {
            throw new HttpException("There is an error: Creating User", HttpStatus.BAD_REQUEST);
        }
    }

    async login(User: LoginDto, @Req() req:Request, @Res() res:Response){
        try {
            const { email} = await User;

            //Searching user
            const user = await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            
            //Creating Token
            const payload = {id: user.id};
            const token = await this.jwtService.signAsync(payload);

            //Creating Cookie
            res.cookie(process.env.authToken,token);

            return "Correct Credentials";
        
        } catch (error) {
            throw new HttpException("There is an error: Login User", HttpStatus.BAD_REQUEST);
        }
    }
}
