import { InputType, Int, Field, PartialType, OmitType } from '@nestjs/graphql';
import { User, UserRole } from '../entities/user.entity';

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
export class UpdateUserProfileInput extends PartialType(
  OmitType(CreateUserInput, ['password']),
) {

}
@InputType()
export class UpdateUserInput extends UpdateUserProfileInput {
  @Field(() => UserRole)
  role: UserRole;
}

@InputType()
export class MatchUsersInput extends PartialType(
  OmitType(User, ['id', "accessTokens", "password"], InputType),
) {}
