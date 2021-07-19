import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { UserDocument } from 'src/entity-modules/users/entities/user.entity';
import { Message } from 'src/helpers/gql';
import { JwtAuthGuard, LocalAuthGuard } from './auth.guards';
import { CurrentUser, CurrentUserToken } from './auth.helpers';
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

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async logout(
    @CurrentUser() user: UserDocument,
    @CurrentUserToken() token: string,
  ): Promise<Message> {
    await this.authService.logout(user, token);
    return { message: 'user logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Message)
  async logoutAllDevices(@CurrentUser() user: UserDocument): Promise<Message> {
    await this.authService.logoutAllDevices(user);
    return { message: 'user logged out from all devices successfully' };
  }
}
