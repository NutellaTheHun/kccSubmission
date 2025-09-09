import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../../typeorm/getTypeOrmModule';
import { State } from '../../geometry/entities/state.entity';
import { GeometryModule } from '../../geometry/geometry.module';
import { StormData } from '../../storm-data/entities/storm-data';
import { StormHeader } from '../../storm-data/entities/storm-header';
import { WindRadiiMaxExtentData } from '../../storm-data/entities/wind-radii-max-extent-data';
import { StormDataModule } from '../../storm-data/storm-data.module';
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
    expect(results.length).toBeGreaterThan(0);
  });
});
