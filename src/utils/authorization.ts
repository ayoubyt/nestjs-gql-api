import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { UserDocument, UserRole } from 'src/entity-modules/users/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ROLES_KEY = 'roles';
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRole)
        return true;
    const ctx = GqlExecutionContext.create(context);
    const user : UserDocument = ctx.getContext().req.user;
    console.log({r: user.role, rr : requiredRole})
    if (user?.role === UserRole.ADMIN)
      return true;
    return user?.role === requiredRole;
  }
}
