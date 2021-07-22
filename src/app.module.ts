import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './entity-modules/users/users.module';
import { gqlConf } from './config/config';
import { AuthModule } from './utility-modules/auth/auth.module';
import { EmployeesModule } from './entity-modules/employees/employees.module';
import { SeedCommands } from './utils/commands/seed.commands';
import { CommandModule } from 'nestjs-command';
import { gql } from './utils/utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), gqlConf.schemaFilePath),
    }),
    CommandModule,
    UsersModule,
    EmployeesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [SeedCommands],
})
export class AppModule {}
