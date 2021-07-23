import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { gqlConf } from 'src/config/config';
import { UsersModule } from 'src/entity-modules/users/users.module';
import { EmployeesModule } from 'src/entity-modules/employees/employees.module';
import { AuthModule } from 'src/utility-modules/auth/auth.module';
import { gql } from '../src/utils/utils';
import { AppModule } from 'src/app.module';

// owner.e2e.spec.ts
describe('Owner test (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

});
