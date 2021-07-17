import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersResolver } from './employers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Employer, EmployerSchema } from './entities/employer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employer.name, schema: EmployerSchema },
    ]),
  ],
  providers: [EmployersResolver, EmployersService],
})
export class EmployersModule {}
