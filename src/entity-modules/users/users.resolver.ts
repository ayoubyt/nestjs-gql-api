import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { RegisterInput } from './dto/employer.inputs';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly employersService: UsersService) {}

  @Query(() => [User])
  employers() {
    return this.employersService.findAll();
  }
}
