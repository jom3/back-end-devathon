import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: "/api/auth/signup", method: RequestMethod.POST})
  }
}
