import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginDto } from './dto';
import { AuthGuard } from './guard/auth.guard';
import { GetUser } from './decorators/getUser.decorator';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('home')
  @UseGuards(AuthGuard)
  home(@GetUser() user: { id: string; email: string }) {
    return user;
  }
}
