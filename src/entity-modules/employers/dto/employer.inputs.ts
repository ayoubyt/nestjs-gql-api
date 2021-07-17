import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { Employer } from '../entities/employer.entity';

@InputType()
export class CreateEmployerInput extends OmitType(Employer, ["_id"], InputType) {
}

@InputType()
export class UpdateEmployerInput extends PartialType(CreateEmployerInput) {
  @Field(() => Int)
  id: number;
}
