import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StormDataController } from './controllers/storm-data.controller';
import { StormHeaderController } from './controllers/storm-header.controller';
import { StormData } from './entities/storm-data';
import { StormHeader } from './entities/storm-header';
import { WindRadiiMaxExtentData } from './entities/wind-radii-max-extent-data';
import { StormDataService } from './services/storm-data.service';
import { StormHeaderService } from './services/storm-header.service';
import { WindRadiiMaxExtentDataService } from './services/wind-radii-max-extent.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StormData, StormHeader, WindRadiiMaxExtentData]),
  ],
  controllers: [StormDataController, StormHeaderController],
  providers: [
    StormDataService,
    StormHeaderService,
    WindRadiiMaxExtentDataService,
  ],
  exports: [StormDataService, StormHeaderService],
})
export class HurdatDataModule {}
