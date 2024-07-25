import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware, LoginMiddleware } from './middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './util/constants';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: "60m"}
    })
  ]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        {path: "/api/auth/signup", method: RequestMethod.POST})
    consumer
      .apply(LoginMiddleware)
      .forRoutes(
        {path: "/api/auth/signin", method: RequestMethod.POST}
      )
  }
}
