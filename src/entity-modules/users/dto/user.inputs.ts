import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends OmitType(
  User,
  ['id', 'role', 'accessTokens'],
  InputType,
) {
  @Field()
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['password']),
) {

}
