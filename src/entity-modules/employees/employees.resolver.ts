import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';
import { CurrentUser } from 'src/utility-modules/auth/auth.helpers';
import { PaginationArgs } from 'src/utils/gql';
import { UserDocument } from '../users/entities/user.entity';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from './dto/employee.inputs';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(() => [Employee])
  employees(
    @Args()
    paginationArgs: PaginationArgs,
    @CurrentUser()
    user: UserDocument,
  ) {
    return this.employeesService.findAll(user, paginationArgs.paginationInput);
  }

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') data: CreateEmployeeInput,
    @CurrentUser() user: UserDocument,
  ) {
    return this.employeesService.createOne(data, user.id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('employeeId') employeeId: string,
    @Args('updateEmployeeInput') data: UpdateEmployeeInput,
  ) {
    return this.employeesService.updateOne(employeeId, data);
  }

  @Mutation(() => Employee)
  deleteEmployee(@Args('employeeId') employeeId: string) {
    return this.employeesService.deleteOne(employeeId);
  }
}
