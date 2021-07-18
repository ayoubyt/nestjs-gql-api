import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { GqlLocalAuthGuard } from './auth.guards';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.obj';

@Resolver(() => AuthResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  register(@Args('createUserInput') data: CreateUserInput) {
    return this.authService.register(data);
  }
}
