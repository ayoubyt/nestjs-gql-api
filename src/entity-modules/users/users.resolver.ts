import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserDocument, UserRole } from './entities/user.entity';
import { UpdateUserInput } from './dto/user.inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';
import { Role, RolesGuard } from 'src/utils/authorization';
import { CurrentUser } from 'src/utility-modules/auth/auth.helpers';
import { PaginationArgs } from 'src/utils/gql';
import { CheckObjectId } from 'src/utils/mogo';
import { Employee } from '../employees/entities/employee.entity';
import { EmployeesService } from '../employees/employees.service';
import { QueryEmployeesArgs } from '../employees/dto/employee.args';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  @Query(() => User, {
    description: 'returns user (request sender) own personal data',
  })
  me(@CurrentUser() user: UserDocument) {
    return user;
  }

  @Query(() => User)
  user(@Args('userId', CheckObjectId) id: string) {
    return this.usersService.findOneById(id);
  }

  @Role(UserRole.ADMIN)
  @Query(() => [User], {
    description: 'only admin user can read data about other users',
  })
  users(
    @Args()
    paginationArgs: PaginationArgs,
  ) {
    return this.usersService.findAll(paginationArgs.paginationInput);
  }

  @ResolveField(() => [Employee])
  employees(
    @Args() data: QueryEmployeesArgs,
    @Parent()
    user: UserDocument,
  ) {
    return this.employeesService.findAll(user, data.paginationInput, {
      ...data.matchInput,
      employerId: user.id,
    });
  }

  @Role(UserRole.ADMIN)
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

  @Role(UserRole.ADMIN)
  @Mutation(() => User, {
    description:
      'only admin can delete other users and normal users can only delete there profile',
  })
  deleteUser(
    @CurrentUser() user: UserDocument,
    @Args('userId') userId: string,
  ) {
    return this.usersService.deleteOne(userId, user);
  }

  @Mutation(() => User, {
    description: 'a mutation for user to update its own profile',
  })
  updateProfile(
    @CurrentUser() user: UserDocument,
    @Args('uspdateUserInput') data: UpdateUserInput,
  ) {
    return this.usersService.updateOne(user.id, data, user);
  }

  @Mutation(() => User, {
    description: 'a mutation for user to delete its own profile',
  })
  deleteProfile(@CurrentUser() user: UserDocument) {
    return this.usersService.deleteOne(user.id, user);
  }
}
