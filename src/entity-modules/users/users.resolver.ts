import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/user.inputs';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';

@UseGuards(JwtAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly employersService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.employersService.findAll();
  }
}
