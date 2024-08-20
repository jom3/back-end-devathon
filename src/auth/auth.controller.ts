import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailDto, LoginDto, PasswordDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { signUpPostApi } from 'src/docs/auth-api/signUpPost.decorator';
import { signInPostApi } from 'src/docs/auth-api/signInPost.decorator';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto';
import { GoogleOauthGuard } from './guard/google-oauth.guard';
import { GetUser } from './decorators/getUser.decorator';
import { AuthGuard } from './guard/auth.guard';

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

  //Recovery Password
  @Post('recoverypass')
    searchEmail(@Body() emailDto: EmailDto){
      return this.authService.createEmailToken(emailDto);
    }

  @Post('recoverypass/resetpassword')
  @UseGuards(AuthGuard)
  recoveryPassword(@GetUser() user,@Body() passwordDto: PasswordDto){
    return this.authService.resetPassword(passwordDto, user);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() req) {}
  
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req: any) {
    return this.authService.googleLogin(req)
  }

  @Post('google/validate')
  async googleRegister(@Body() data: any) {
    //Validacion de token de google
    const userGoogleMetadata = await this.authService.googleLoginValidate(data.token);
    if(!userGoogleMetadata) throw new UnauthorizedException('Invalid Token');
    //Validacion de Usario en la base de datos
    const dataUser = await this.authService.registerUserFromGoogle(userGoogleMetadata);
    return dataUser;
  }
}
