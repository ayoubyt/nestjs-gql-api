import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from './dto/employee.inputs';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import * as mongoose from 'mongoose';
import { PaginationInput } from 'src/utils/gql';
import { UserDocument, UserRole } from '../users/entities/user.entity';

const { ObjectId } = mongoose.Schema.Types;

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAll(user: UserDocument, pagination?: PaginationInput) {
    let query : mongoose.FilterQuery<EmployeeDocument> = {};
      /**
       * if user is admin, return all employees, else return only user
       * own employees
       */
    if (user.role === UserRole.USER)
      query.employerId = user.id;

    let employees = await this.employeeModel
      .find(query)
      .skip(pagination?.offset)
      .limit(pagination?.limit);

    return employees;
  }

  async createOne(data: CreateEmployeeInput, employerId: string) {
    let employee = new this.employeeModel(data);
    employee.employerId = new ObjectId(employerId);
    return await employee.save();
  }

  async updateOne(employeeId: string, data: UpdateEmployeeInput) {
    let employee = await this.employeeModel.findById(employeeId);
    if (!employee)
      throw new NotFoundException(`employee with id '${employeeId}' not found`);
    employee.set({ ...data });

    return await employee.save();
  }

  async deleteOne(employeeId: string) {
    let employee = await this.employeeModel.findById(employeeId);
    if (!employee)
      throw new NotFoundException(`employee with id '${employeeId}' not found`);
    return await employee.remove();
  }
}
