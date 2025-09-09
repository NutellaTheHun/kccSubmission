import { Module } from '@nestjs/common';
import { StormDataModule } from '../storm-data/storm-data.module';
import { HurdatParserService } from './hurdat-parser.service';

@Module({
  imports: [StormDataModule],
  controllers: [],
  providers: [HurdatParserService],
  exports: [HurdatParserService],
})
export class HurdatParserModule {}
