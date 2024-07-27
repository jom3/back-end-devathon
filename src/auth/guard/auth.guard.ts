import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token: string = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Not Authorized');
    }

    const { id } = await this.jwtService.verifyAsync(token.split(' ')[1], {
      secret: this.configService.get('jwtSecret'),
    });

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      },
    });

    request['user'] = user;

    return true;
  }
}
