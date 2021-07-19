import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { User, UserDocument } from 'src/entity-modules/users/entities/user.entity';
import { LocalAuthGuard } from './auth.guards';
import { CurrentUser } from './auth.helpers';
import { AuthService } from './auth.service';
import { AuthResult } from './dto/auth-result.obj';
import { LoginUserInput } from './dto/login.input';

@Resolver(() => AuthResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  register(@Args('createUserInput') data: CreateUserInput) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthResult)
  login(
    @Args('loginUserInput') data: LoginUserInput,
    @CurrentUser() user: UserDocument,
  ) {
    return this.authService.login(user);
  }
}
