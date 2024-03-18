import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const token_type = authHeader.split(' ')[0];
            const token_value = authHeader.split(' ')[1];
            if (token_type !== "Bearer" || !token_value) {
                throw new UnauthorizedException({message: "Не авторизован"});
            }
            const user = this.jwtService.verify(token_value);
            req.user = user;
            console.log(user);
            return user.roles.some(role_item => requiredRoles.includes(role_item.value));
        } catch (e) {
            console.log(e)
            throw new HttpException("Доступ запрщен", HttpStatus.FORBIDDEN);
        }
    }
}
