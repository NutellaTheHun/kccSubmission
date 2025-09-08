import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../../typeorm/getTypeOrmModule';
import { CreateStormHeaderDto } from '../dtos/create-storm-header.dto';
import { StormHeader } from '../entities/storm-header';
import { StormHeaderService } from './storm-header.service';

describe('storm header service', () => {
  let headerService: StormHeaderService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        getTypeOrmModule([StormHeader]),
        TypeOrmModule.forFeature([StormHeader]),
      ],
      providers: [StormHeaderService],
    }).compile();

    headerService = module.get<StormHeaderService>(StormHeaderService);
  });

  afterAll(async () => {
    await headerService.getQueryBuilder().delete().execute();
  });

  it('should create storm header', async () => {
    const dto = {
      location: 'AL',
      ATCFCycloneNumber: 9,
      year: 2021,
      name: 'IDA',
      entries: 1,
    } as CreateStormHeaderDto;

    const result = await headerService.create(dto);

    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
  });
});
