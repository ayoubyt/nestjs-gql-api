import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
} from './dto/employee.inputs';
import { Employee, EmployeeDocument } from './entities/employee.entity';
import * as mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAll() {
    let employees = await this.employeeModel.find();
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

  async deleteOne(employeeId: string)
  {
    let employee = await this.employeeModel.findById(employeeId);
    if (!employee)
      throw new NotFoundException(`employee with id '${employeeId}' not found`);
    return await employee.remove();

  }
}
