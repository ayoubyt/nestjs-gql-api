import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './entity-modules/users/users.module';
import { env, gqlConf } from './config/config';
import { AuthModule } from './utility-modules/auth/auth.module';
import { EmployeesModule } from './entity-modules/employees/employees.module';
import { SeederModule } from './utility-modules/seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema: env.validationSchema }),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), gqlConf.schemaFilePath),
    }),
    UsersModule,
    EmployeesModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
