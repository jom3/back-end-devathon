import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authservice: AuthService){}

    @Get('signup')
    signUp(@Req() req:Request, @Res() res:Response){
        try {
            res.status(201).json({
                message: "Hello from signUp page.!"
            })
        } catch (error) {
            throw new HttpException("Page Not Found", HttpStatus.BAD_REQUEST)
        }
    }

    @Post('signup')
    async registerUser(@Body() data: CreateUserDto,@Res() res:Response){
        const value = await this.authservice.createUser(data);        
        return res.status(201).json({
            message: value
        })
    }
}
