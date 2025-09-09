import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from '../../../modules/geometry/entities/state.entity';
import { GeometryModule } from '../../../modules/geometry/geometry.module';
import { StormData } from '../../../modules/storm-data/entities/storm-data';
import { StormHeader } from '../../../modules/storm-data/entities/storm-header';
import { WindRadiiMaxExtentData } from '../../../modules/storm-data/entities/wind-radii-max-extent-data';
import { StormDataModule } from '../../../modules/storm-data/storm-data.module';
import { getTypeOrmModule } from '../../../typeorm/getTypeOrmModule';
import { ReportService } from './report.service';

describe('report service', () => {
  let reportService: ReportService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        getTypeOrmModule([
          State,
          StormData,
          StormHeader,
          WindRadiiMaxExtentData,
        ]),
        TypeOrmModule.forFeature([
          State,
          StormData,
          StormHeader,
          WindRadiiMaxExtentData,
        ]),
        StormDataModule,
        GeometryModule,
      ],
      providers: [ReportService],
    }).compile();

    reportService = module.get<ReportService>(ReportService);
  });

  it('should query stormData overlapping with florida', async () => {
    const results = await reportService.stormOverlapState('florida');
    console.log(results);
    expect(results.length).toBeGreaterThan(0);
  });
});
