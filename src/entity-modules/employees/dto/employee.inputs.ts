import {
  InputType,
  Int,
  Field,
  PartialType,
  OmitType,
  Args,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/utils/gql';
import { Employee } from '../entities/employee.entity';

@InputType()
export class CreateEmployeeInput extends OmitType(
  Employee,
  ['id', 'employerId'],
  InputType,
) {}

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {}

@InputType()
export class MatchEmployyesInput extends PartialType(
  OmitType(Employee, ['id'], InputType),
) {}
