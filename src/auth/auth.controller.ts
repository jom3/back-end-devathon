import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto, LoginDto } from './dto';
import { AuthGuard } from './guard/auth.guard';

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
    async registerUser(@Body() data: CreateUserDto, @Req() req: Request , @Res() res:Response){
        const value = await this.authservice.createUser(data, req, res);        
        return res.status(201).json({
            message: value
        })
    }


    @Get('signin')
    signIn(@Req() req:Request, @Res() res:Response){
        try {
            res.status(201).json({
                message: "Hello from signIn page.!"
            })
        } catch (error) {
            throw new HttpException("Page Not Found", HttpStatus.BAD_REQUEST)
        }
    }

    @Post('signin')
    async checkUser(@Body() data: LoginDto, @Req() req: Request , @Res() res:Response){
        const value = await this.authservice.login(data, req, res);        
        return res.status(201).json({
            message: value
        })
    }

    // @Get('home')
    // @UseGuards(AuthGuard)
    // home(@Req() req: Request, @Res() res:Response){

    //     try {
    //         console.log("Form home: " + req.query.userID);
    //         const userID = req.query.userID;

    //         res.status(201).json({
    //             message: `${userID}`
    //         })
    //     } catch (error) {
    //         console.log(error.message);
    //         throw new HttpException("Error Home", HttpStatus.BAD_REQUEST)
    //     }
    // }
}
