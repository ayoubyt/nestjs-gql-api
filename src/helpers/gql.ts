import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

/** generates a gql field middlware that transforms
 * the returning values returned from mongoose for example
 * to the coresponding Graphql enum values expected
 */

export const stringToEnumMiddleware = (
  enumuration: object,
): FieldMiddleware => {
  return async (ctx: MiddlewareContext, next: NextFn) => {
    const value = await next();
    return enumuration[value];
  };
};
