import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SeederService } from '../src/utility-modules/seeder/seeder.service';
import { Command } from 'commander';

async function bootstrap() {
  const program = new Command();
  program
    .description('a script for seeding the database')
    .option('-c|--clear', 'clear users and employees collections')
    .option('-a|--admin', 'add only the init admin')
    .option(
      '-e|--employers-and-employees',
      'seed only users and employees collections',
    );
  program.parse(process.argv);

  let appContext = await NestFactory.createApplicationContext(AppModule);

  const options = program.opts();
  const seeder = appContext.get(SeederService);

  if (options.clear) await seeder.clear();
  else if (options.admin) await seeder.addAdmin();
  else if (options.employersAndEmployees) await seeder.addEmployerAndEmployees();
  else await seeder.seed();
  process.exit(0);
}
bootstrap();
