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
import * as faker from 'faker';
import { hashText } from '../crypto';
import { range } from '../utils';
import * as mongoose from 'mongoose';
import { initAdmin } from '../../config/config';

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
      range(SeedCommands._numEmployers).map((i) => this._randomEmployer(i)),
    );
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
    console.log(
      `${SeedCommands._numEmployers} employers and ${
        SeedCommands._numEmployeesPerEmployer * SeedCommands._numEmployers
      } employees created`,
    );
    process.stdout.write('\ndone !\n');
    process.exit(0);
  }

  @Command({
    command: 'seed:delete-employers-and-employees',
    aliases: 'seed:clear',
    autoExit: false,
    describe: 'deletes users and employees collections',
  })
  async deleteEmployerAndEmployees() {
    await this.employeeModel.collection.drop();
    await this.userModel.collection.drop();
    process.stdout.write(
      `${this.userModel.collection.name} and ${this.employeeModel.collection.name} collections deleted\n`,
    );
    process.exit(0);
  }

  @Command({
    command: 'seed:admin',
  })
  async addAdmin() {
    let password = await hashText(initAdmin.password);
    let admin = new this.userModel({ ...initAdmin, password });
    let data = await admin.save();
    console.log('init admin created success fully');
    console.log(data.toObject());
  }

  private async _randomEmployer(i: number) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName + i, lastName);
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
