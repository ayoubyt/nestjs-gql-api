import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Employee } from '../entities/employee.entity';

@InputType()
export class CreateEmployeeInput extends OmitType(
  Employee,
  ['id', "employerId"],
  InputType,
) {}

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {}
