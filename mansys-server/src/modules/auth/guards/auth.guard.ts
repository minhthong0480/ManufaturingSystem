import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from "../../../config/auth.config";
import { Request } from 'express';
import { Inject } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(JwtService)
        private readonly jwtService: JwtService,
        @Inject(UsersService)
        private readonly userService: UsersService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConfig.secret
                }
            );
            var user = await this.userService.findOne(payload.id);
            //this user has been deactive, need to block this user
            if(!user.indicateSuccess())
               throw new UnauthorizedException('This user is no longer valid in the system!'); 
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}