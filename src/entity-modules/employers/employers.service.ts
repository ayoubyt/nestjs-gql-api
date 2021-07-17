import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployerInput } from './dto/employer.inputs';
import { Employer, EmployerDocument } from './entities/employer.entity';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name)
    private readonly employerModel: Model<EmployerDocument>,
  ) {}

  async findAll() {
    return await this.employerModel.find().lean();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} employer`;
  // }

  async create(createEmployerInput: CreateEmployerInput) {
    let employer = new this.employerModel(createEmployerInput);
    return await employer.save();
  }

  // update(id: number, updateEmployerInput: UpdateEmployerInput) {
  //   return `This action updates a #${id} employer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employer`;
  // }
}
