import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Employee,
  EmployeeDocument,
} from 'src/entity-modules/employees/entities/employee.entity';
import {
  User,
  UserDocument,
} from 'src/entity-modules/users/entities/user.entity';
import { Command, Positional, Option } from 'nestjs-command';
import { CreateUserInput } from 'src/entity-modules/users/dto/user.inputs';
import { CreateEmployeeInput } from 'src/entity-modules/employees/dto/employee.inputs';
import * as faker from 'faker';
import { hashText } from '../crypto';
import { range } from '../utils';
import * as mongoose from 'mongoose';
import console from 'console';

@Injectable()
export class SeedCommands {
  private static _numEmployers = 10;
  private static _numEmployeesPerEmployer = 100;
  private static _defaultPassword = '123456789';

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  @Command({
    command: 'seed:employers-and-employees',
    aliases: 'seed',
    autoExit: false,
    describe: 'seeds users and employees conllections with random data',
  })
  async seedEmployerAndEmployees() {
    let employers = await Promise.all(
      range(SeedCommands._numEmployers).map(() => this._randomEmployer()),
    );
    process.stdout.write(`${employers.length}\n`);
    await Promise.all(
      employers.map(async (e) => {
        let employer = new this.userModel(e);
        await employer.save();
        process.stdout.write('*');
        await this.employeeModel.insertMany(
          range(SeedCommands._numEmployeesPerEmployer).map(() => {
            return this._randomEmployee(employer.id);
          }),
        );
        process.stdout.write('.'.repeat(SeedCommands._numEmployeesPerEmployer));
      }),
    );
    process.stdout.write('\ndone !\n');
    process.exit(0);
  }

  @Command({
    command: 'seed:delete-employers-and-employees',
    aliases: 'seed:clear',
    autoExit: false,
    describe: 'deletes users and employees conllections',
  })
  async deleteEmployerAndEmployees() {
    await this.employeeModel.collection.drop();
    await this.userModel.collection.drop();
    process.stdout.write(
      `${this.userModel.collection.name} and ${this.employeeModel.collection.name} conllections deleted\n`,
    );
    process.exit(0);
  }

  private async _randomEmployer() {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    let password = await hashText(SeedCommands._defaultPassword);
    return { firstName, lastName, email, password };
  }

  private _randomEmployee(employerId: mongoose.Schema.Types.ObjectId) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    return { firstName, lastName, email, employerId };
  }
}
