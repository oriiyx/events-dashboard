import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.log(`isPublic: ${isPublic}`);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    this.logger.log(`Request: ${JSON.stringify(request.headers)}`);
    const token = this.extractTokenFromHeader(request);
    this.logger.log(`Token: ${token}`);

    if (!token) {
      this.logger.log('No token found');
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      this.logger.log(`Payload: ${JSON.stringify(payload)}`);

      request['user'] = payload;
    } catch {
      this.logger.error('Invalid token');
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    this.logger.log(`Type: ${type}, Token: ${token}`);
    return type === 'Bearer' ? token : undefined;
  }
}
