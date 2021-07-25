import {
  ArgsType,
  Field
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/utils/gql';
import { MatchEmployeesInput } from './employee.inputs';

@ArgsType()
export class QueryEmployeesArgs extends PaginationArgs {
  @Field({nullable: true, defaultValue: {}})
  matchInput: MatchEmployeesInput;
}
