import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../../typeorm/getTypeOrmModule';
import { CreateStormDataDto } from '../dtos/create-storm-data.dto';
import { CreateStormHeaderDto } from '../dtos/create-storm-header.dto';
import { StormData } from '../entities/storm-data';
import { StormHeader } from '../entities/storm-header';
import { WindRadiiMaxExtentData } from '../entities/wind-radii-max-extent-data';
import { StormDataService } from './storm-data.service';
import { StormHeaderService } from './storm-header.service';

describe('storm data service', () => {
  let dataService: StormDataService;
  let headerService: StormHeaderService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        getTypeOrmModule([StormData, StormHeader, WindRadiiMaxExtentData]),
        TypeOrmModule.forFeature([
          StormData,
          StormHeader,
          WindRadiiMaxExtentData,
        ]),
      ],
      providers: [StormDataService, StormHeaderService],
    }).compile();

    dataService = module.get<StormDataService>(StormDataService);
    headerService = module.get<StormHeaderService>(StormHeaderService);
  });

  afterAll(async () => {
    await dataService.getQueryBuilder().delete().execute();
    await headerService.getQueryBuilder().delete().execute();
  });

  it('should create storm data, (needs header first)', async () => {
    const headerDto = {
      location: 'PC',
      ATCFCycloneNumber: 8,
      year: 2020,
      name: 'UNNAMED',
      entries: 1,
    } as CreateStormHeaderDto;

    const header = await headerService.create(headerDto);
    expect(header).not.toBeNull();
    expect(header).not.toBeUndefined();

    const headerId = header.id;

    const dto = {
      year: 1,
      month: 2,
      day: 3,
      hoursUTC: 4,
      minutes: 5,
      latitude: 6,
      hemisphereNS: 'N',
      longitude: 7,
      hemisphereEW: 'W',
      maxSustainedWindKnots: 8,
      minPressureMillibars: 9,
      radiusMaxWindNauticalMiles: 10,
      headerId: headerId,
      recordIdentifier: 'L',
      systemStatus: 'H',
    } as CreateStormDataDto;

    const result = await dataService.create(dto);

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});
