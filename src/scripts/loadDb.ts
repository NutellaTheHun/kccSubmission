import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { HurdatParserService } from '../modules/hurdat-parser/hurdat-parser.service';

async function loadDb() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const parser = (await app).get(HurdatParserService);
  await parser.parseHurdat2CSV('data/hurdat2.txt');
  console.log('Parse complete.');
  await app.close();
}
loadDb();
