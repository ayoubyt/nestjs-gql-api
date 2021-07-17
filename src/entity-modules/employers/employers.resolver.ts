import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployersService } from './employers.service';
import { Employer } from './entities/employer.entity';
import { CreateEmployerInput } from './dto/employer.inputs';

@Resolver(() => Employer)
export class EmployersResolver {
  constructor(private readonly employersService: EmployersService) {}

  @Query(() => [Employer])
  employers() {
    return this.employersService.findAll();
  }

  // @Query(() => Employer, { name: 'employer' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.employersService.findOne(id);
  // }

  @Mutation(() => Employer)
  createEmployer(
    @Args('createEmployerInput') createEmployerInput: CreateEmployerInput,
  ) {
    return this.employersService.create(createEmployerInput);
  }

  // @Mutation(() => Employer)
  // updateEmployer(
  //   @Args('updateEmployerInput') updateEmployerInput: UpdateEmployerInput,
  // ) {
  //   return this.employersService.update(
  //     updateEmployerInput.id,
  //     updateEmployerInput,
  //   );
  // }

  // @Mutation(() => Employer)
  // removeEmployer(@Args('id', { type: () => Int }) id: number) {
  //   return this.employersService.remove(id);
  // }
}
