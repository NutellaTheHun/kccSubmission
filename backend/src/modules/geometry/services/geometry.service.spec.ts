import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../../typeorm/getTypeOrmModule';
import { State } from '../entities/state.entity';
import { GeometryService } from './geometry.service';

describe('geometry service', () => {
  let geoService: GeometryService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        getTypeOrmModule([State]),
        TypeOrmModule.forFeature([State]),
      ],
      providers: [GeometryService],
    }).compile();

    geoService = module.get<GeometryService>(GeometryService);
  });

  it('should get all', async () => {
    const result = await geoService.findAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should get florida', async () => {
    const result = await geoService.findOneByName('florida');
    expect(result?.name).toEqual('florida');
  });

  it('should reutrn true, point in florida', async () => {
    const lonLatInFlorida = [-81.76, 27.99];
    const result = await geoService.stateContainsPoint(
      'florida',
      lonLatInFlorida[0],
      lonLatInFlorida[1],
    );
    expect(result).toBeTruthy();
  });

  it('should reutrn false, point not in florida', async () => {
    const lonLatNotInFlorida = [-75.8, 28.19];
    const result = await geoService.stateContainsPoint(
      'florida',
      lonLatNotInFlorida[0],
      lonLatNotInFlorida[1],
    );
    expect(result).toBeFalsy();
  });
});
