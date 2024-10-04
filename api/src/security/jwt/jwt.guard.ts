/**
 * A guard class must be annotated with @Injectable and
 * must implements CanActivate interface (or another security interface)
 * and provide an implementation of canActivate method.
 * The canActivate() method will be called with each API request
 * if the guard is applied globally.
 *
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SecurityService } from '@security/service/security.service';
import { Reflector } from '@nestjs/core';
import { from, map, Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '@common/config';
import { isNil } from 'lodash';
import {
  NoTokenFoundException,
  TokenExpiredException,
} from '@security/security.exception';
import { Credential } from '@security/model';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly _logger = new Logger(JwtGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Here we check if route have @Public decorator
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // If the route is public, the method returns true,
    // else, we validate the access token from request
    return isPublic
      ? true
      : this.validateToken(context.switchToHttp().getRequest());
  }

  private validateToken(request: any): Observable<boolean> {
    //
    if (!isNil(request.headers['authorization'])) {
      try {
        // Here we verify that the token isn't expired
        // We extract the token from the header 'authorization'
        const id = this.jwtService.verify(
          request.headers['authorization'].replace('Bearer ', ''),
        ).sub;

        return from(this.securityService.detail(id)).pipe(
          map((user: Credential) => {
            request.user = user;
            return true;
          }),
        );
      } catch (e) {
        this._logger.error(e.message);
        throw new TokenExpiredException();
      }
    }

    throw new NoTokenFoundException();
  }
}
