import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationArgs, PaginationInput } from 'src/utils/gql';
import {
  Employee,
  EmployeeDocument,
} from '../employees/entities/employee.entity';
import {
  CreateUserInput,
  MatchUsersInput,
  UpdateUserProfileInput,
} from './dto/user.inputs';
import { User, UserDocument, UserRole } from './entities/user.entity';
import * as mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async findAll(pagination?: PaginationInput, match?: MatchUsersInput) {
    let q: mongoose.FilterQuery<EmployeeDocument> = {};

    if (match)
      Object.entries(match).forEach(([key, val]) => {
        q[key] = { $regex: val, $options: 'i' };
      });

    return await this.userModel
      .find(q)
      .skip(pagination?.offset)
      .limit(pagination?.limit);
  }

  async findOneById(id: string, check = true) {
    let user = await this.userModel.findById(id);
    if (!user && check)
      throw new NotFoundException(`user with id ${id} not found`);
    return user;
  }

  async findOneByEmail(email: string) {
    let user = await this.userModel.findOne({ email });
    return user;
  }

  async create(createEmployerInput: CreateUserInput) {
    let user = new this.userModel(createEmployerInput);
    return await user.save();
  }

  async updateOne(
    userId: string,
    data: UpdateUserProfileInput,
    currentUser: UserDocument,
  ) {
    if (currentUser.id === userId) {
      currentUser.set(data);
      return await currentUser.save();
    } else {
      if (currentUser.role !== UserRole.ADMIN)
        throw new ForbiddenException(`only admin can edit others data`);
      let other = await this.userModel.findById(userId);
      if (!other)
        throw new NotFoundException(`user with id '${userId}' not found`);
      if (other.role === UserRole.ADMIN)
        throw new ForbiddenException(`an admin can not edit other admin`);
      other.set(data);
      return other.save();
    }
  }

  async deleteOne(userId: string, currentUser: UserDocument) {
    if (currentUser.id === userId) {
      await this.employeeModel.deleteMany({ employerId: currentUser.id });
      return await currentUser.remove();
    } else {
      if (currentUser.role !== UserRole.ADMIN)
        throw new ForbiddenException(`only admin can delete others users`);
      let other = await this.userModel.findById(userId);
      if (!other)
        throw new NotFoundException(`user with id '${userId}' not found`);
      if (other.role === UserRole.ADMIN)
        throw new ForbiddenException(`an admin can not delete other admin`);
      await this.employeeModel.deleteMany({ employerId: other.id });
      return await other.remove();
    }
  }
}
