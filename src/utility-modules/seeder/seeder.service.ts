import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as faker from 'faker';
import { Model } from 'mongoose';
import { initAdmin } from 'src/config/config';
import {
  Employee,
  EmployeeDocument,
} from 'src/entity-modules/employees/entities/employee.entity';
import {
  User,
  UserDocument,
} from 'src/entity-modules/users/entities/user.entity';
import { hashText } from 'src/utils/crypto';
import { range } from 'src/utils/utils';

@Injectable()
export class SeederService {
  private static _numEmployers = 10;
  private static _numEmployeesPerEmployer = 100;
  private static _defaultPassword = '123456789';

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async seed() {
    await this.addAdmin();
    await this._addEmployerAndEmployees();
  }

  async clear() {
    await this._deleteEmployerAndEmployees();
  }

  private async _addEmployerAndEmployees() {
    let employers = await Promise.all(
      range(SeederService._numEmployers).map((i) => this._randomEmployer(i)),
    );
    await Promise.all(
      employers.map(async (e) => {
        let employer = new this.userModel(e);
        await employer.save();
        process.stdout.write('*');
        await this.employeeModel.insertMany(
          range(SeederService._numEmployeesPerEmployer).map(() => {
            return this._randomEmployee(employer.id);
          }),
        );
        process.stdout.write(
          '.'.repeat(SeederService._numEmployeesPerEmployer),
        );
      }),
    );
    console.log(
      `${SeederService._numEmployers} employers and ${
        SeederService._numEmployeesPerEmployer * SeederService._numEmployers
      } employees created`,
    );
    process.stdout.write('\ndone !\n');
  }

  private async _deleteEmployerAndEmployees() {
    await this.employeeModel.collection.drop();
    await this.userModel.collection.drop();
    process.stdout.write(
      `${this.userModel.collection.name} and ${this.employeeModel.collection.name} collections deleted\n`,
    );
  }

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
    let password = await hashText(SeederService._defaultPassword);
    return { firstName, lastName, email, password };
  }

  private _randomEmployee(employerId: string) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email(firstName, lastName);
    return { firstName, lastName, email, employerId };
  }
}
