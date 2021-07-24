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

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get the cats array', () => {
    return request(app.getHttpServer())
      .post("/graphql")
      .send({ query: '{test}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.test).toEqual("done");
      });
  });
});
