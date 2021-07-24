import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateEmployeeInput,
  MatchEmployyesInput,
  UpdateEmployeeInput,
} from './dto/employee.inputs';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import * as mongoose from 'mongoose';
import { PaginationInput } from 'src/utils/gql';
import { UserDocument, UserRole } from '../users/entities/user.entity';

const { ObjectId } = mongoose.Types;

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findOne(employeeId: string) {
    let employee = await this.employeeModel.findById(employeeId);
    if (!employee)
      throw new NotFoundException(`employee with id '${employeeId}' not found`);
    return employee;
  }

  async findAll(
    user: UserDocument,
    pagination?: PaginationInput,
    match?: MatchEmployyesInput,
  ) {
    let q: mongoose.FilterQuery<EmployeeDocument> = {};

    if (match)
      Object.entries(match).forEach(([key, val]) => {
        q[key] = { $regex: val, $options: 'i' };
      });

    /**
     * if user is admin, return all employees, else return only
     * the user own employees
     */
    if (user.role === UserRole.USER) q.employerId = user.id;

    let employees = await this.employeeModel
      .find(q)
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
