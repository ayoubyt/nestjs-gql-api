import { Module } from '@nestjs/common';
import { EmployeesModule } from 'src/entity-modules/employees/employees.module';
import { UsersModule } from 'src/entity-modules/users/users.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [UsersModule, EmployeesModule],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule {}
