import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserDocument, UserRole } from './entities/user.entity';
import { CreateUserInput, UpdateUserInput } from './dto/user.inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';
import { Role, RolesGuard } from 'src/utils/authorization';
import { CurrentUser } from 'src/utility-modules/auth/auth.helpers';

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Role(UserRole.ADMIN)
  @Query(() => [User], {
    description: 'only admin user can read data about other users',
  })
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Mutation(() => User, {
    description:
      'only admin can update other users data and normal user can only update his profile',
  })
  updateUser(
    @CurrentUser() user: UserDocument,
    @Args('userId') userId: string,
    @Args('uspdateUserInput') data: UpdateUserInput,
  ) {
    return this.usersService.updateOne(userId, data, user);
  }

  @Mutation(() => User)
  updateProfile(
    @CurrentUser() user: UserDocument,
    @Args('uspdateUserInput') data: UpdateUserInput,
  ) {
    return this.usersService.updateOne(user.id, data, user);
  }
}
