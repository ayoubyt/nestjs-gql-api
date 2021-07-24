import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SeederService } from '../src/utility-modules/seeder/seeder.service';
import { Command } from 'commander';
import { async } from 'rxjs';

async function bootstrap() {
  NestFactory.createApplicationContext(AppModule).then(async (appContext) => {
    const program = new Command();
    program
      .description('a script for seeding the database')
      .option('-c|--clear', 'clear users and employees collections')
      .option('-a|--admin', 'add only the init admin');

    program.parse(process.argv);

    const options = program.opts();
    const seeder = appContext.get(SeederService);

    if (options.clear) await seeder.clear();
    else if (options.admin) await seeder.addAdmin();
    else await seeder.seed();
    process.exit(0);
  });
}
bootstrap();
