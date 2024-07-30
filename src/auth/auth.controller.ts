import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { AuthGuard } from './guard/auth.guard';
import { GetUser } from './decorators/getUser.decorator';
import { ApiTags } from '@nestjs/swagger';
import { signUpPostApi } from 'src/docs/auth-api/signUpPost.decorator';
import { signInPostApi } from 'src/docs/auth-api/signInPost.decorator';

@ApiTags("Authentication")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @signUpPostApi()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('signin')
  @signInPostApi()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // @Get('home')
  // @UseGuards(AuthGuard)
  // home(@GetUser() user: { id: string; email: string, role: string }) {
  //   return user;
  // }
}
