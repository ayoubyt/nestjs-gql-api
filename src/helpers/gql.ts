import {
  Field,
  FieldMiddleware,
  InputType,
  Int,
  MiddlewareContext,
  NextFn,
  ObjectType,
} from '@nestjs/graphql';
import { Min } from 'class-validator';

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

@ObjectType()
export class Message {
  @Field()
  message: string;
}

@InputType()
export class PaginationInput {
  @Min(0)
  @Field(() => Int, {
    description: 'the steps number of steps to move cusor forward',
  })
  offset: number;
  @Min(0)
  @Field(() => Int, { description: 'number of elements to return' })
  limit: number;
}
