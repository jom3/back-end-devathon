import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../util/constants';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService:JwtService){}

  async canActivate(context: ExecutionContext): Promise<boolean>{

    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const token = request.cookies[process.env.authToken];
    
    if(!token){
      throw new UnauthorizedException("Token not provided")
    }

    try {
      const { id } = await this.jwtService.verifyAsync(token,{secret: jwtConstants.secret});
 
      request.query.userID = id; 

    } catch (error) {
      throw new UnauthorizedException("Incorrect Token")
    }
    return true;
  }
}
