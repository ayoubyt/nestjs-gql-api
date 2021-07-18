import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { UserRole } from '../entities/user.entity';

/**
 * transforms the rering values returned from mongoose
 * to the coresponding Graphql enum values expected
 */

export const roleMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  return UserRole[value];
};
