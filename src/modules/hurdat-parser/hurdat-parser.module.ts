import { Module } from '@nestjs/common';
import { HurdatDataModule } from '../storm-data/hurdat-data.module';

@Module({
  imports: [HurdatDataModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HurdatParserModule {}
