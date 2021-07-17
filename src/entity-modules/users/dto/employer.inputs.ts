import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(User, ["_id"], InputType) {
}

@InputType()
export class UpdateProfileInput extends PartialType(CreateUserInput) {
}
