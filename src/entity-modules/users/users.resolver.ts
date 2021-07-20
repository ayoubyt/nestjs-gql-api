import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserRole } from './entities/user.entity';
import { CreateUserInput } from './dto/user.inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';
import { Role, RolesGuard } from 'src/utils/authorization';

@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly employersService: UsersService) {}

  @Role(UserRole.ADMIN)
  @Query(() => [User])
  users() {
    return this.employersService.findAll();
  }


}
