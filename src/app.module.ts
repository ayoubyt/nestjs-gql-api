import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { EmployersModule } from './entity-modules/employers/employers.module';
import { gqlConf } from './config/global';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), gqlConf.schemaFilePath),
    }),
    EmployersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
