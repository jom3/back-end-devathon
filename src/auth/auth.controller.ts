import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { signUpPostApi } from 'src/docs/auth-api/signUpPost.decorator';
import { signInPostApi } from 'src/docs/auth-api/signInPost.decorator';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('signup')
  @signUpPostApi()
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
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
