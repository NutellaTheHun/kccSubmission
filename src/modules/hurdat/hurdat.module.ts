import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordIdentifier } from './entities/record-identifier';
import { StormData } from './entities/storm-data';
import { StormHeader } from './entities/storm-header';
import { SystemStatus } from './entities/system-status';
import { WindRadiiMaxExtentData } from './entities/wind-radii-max-extent-data';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecordIdentifier,
      StormData,
      StormHeader,
      SystemStatus,
      WindRadiiMaxExtentData,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class HurdatModule {}
