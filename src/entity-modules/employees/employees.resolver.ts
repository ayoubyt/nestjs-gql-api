import { BadRequestException, UseFilters, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { MongoError } from 'mongodb';
import { JwtAuthGuard } from 'src/utility-modules/auth/auth.guards';
import { CurrentUser } from 'src/utility-modules/auth/auth.helpers';
import { PaginationArgs } from 'src/utils/gql';
import { CheckObjectId, MongoExceptionFilter } from 'src/utils/mogo';
import { User, UserDocument } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { QueryEmployeesArgs } from './dto/employee.args';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from './dto/employee.inputs';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(
    private readonly employeesService: EmployeesService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => Employee, { description: 'find one employee by id' })
  employee(@Args('employeeId', CheckObjectId) employeeId: string) {
    return this.employeesService.findOne(employeeId);
  }

  @Query(() => [Employee])
  employees(
    @Args() data: QueryEmployeesArgs,
    @CurrentUser()
    user: UserDocument,
  ) {
    return this.employeesService.findAll(
      user,
      data.paginationInput,
      data.matchInput,
    );
  }

  @ResolveField(() => User)
  employer(@Parent() employee: EmployeeDocument) {
    return this.usersService.findOneById(employee.employerId.toString());
  }

  @Mutation(() => Employee)
  @UseFilters(MongoExceptionFilter)
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
