import {
    ArgsType,
    Field
  } from '@nestjs/graphql';
  import { PaginationArgs } from 'src/utils/gql';
  import { MatchUsersInput } from './user.inputs';

  @ArgsType()
  export class QueryUsersArgs extends PaginationArgs {
    @Field({nullable: true, defaultValue: {}})
    matchInput: MatchUsersInput;
  }
