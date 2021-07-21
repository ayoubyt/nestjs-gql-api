import {
  ArgsType,
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


//_______________________________________________________________

//###############################################################
//_______________________________________________________________

@ObjectType()
export class Message {
  @Field()
  message: string;
}

const DEFUALT_PAGE_LIMIT = 10;
const DEFUALT_PAGE_OFFSET = 0;
@InputType()
export class PaginationInput {
  @Min(0)
  @Field(() => Int, {
    nullable: true,
    description: 'the number of steps to move the read cusor forward',
  })
  offset?: number = DEFUALT_PAGE_OFFSET;

  @Min(0)
  @Field(() => Int, {
    nullable: true,
    description: 'number of elements to to fetch',
  })
  limit?: number = DEFUALT_PAGE_LIMIT;
}

@ArgsType()
export class PaginationArgs {
  @Field({
    nullable: true,
    defaultValue: {
      limit: DEFUALT_PAGE_LIMIT,
      offset: DEFUALT_PAGE_OFFSET,
    },
  })
  paginationInput: PaginationInput;
}
