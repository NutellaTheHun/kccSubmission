import { Inject, Injectable } from '@nestjs/common';
import { State } from '../../../modules/geometry/entities/state.entity';
import { GeometryService } from '../../../modules/geometry/services/geometry.service';
import { StormData } from '../../../modules/storm-data/entities/storm-data';
import { StormDataService } from '../../../modules/storm-data/services/storm-data.service';
import { StormHeaderService } from '../../../modules/storm-data/services/storm-header.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject()
    private readonly dataService: StormDataService,
    @Inject()
    private readonly headerService: StormHeaderService,
    @Inject()
    private readonly geoService: GeometryService,
  ) {}

  async stormOverlapState(stateName: string): Promise<StormData[]> {
    const data = await this.dataService
      .getQueryBuilder('stormData')
      .innerJoin(State, 'state', 'LOWER(state.name) = :stateName', {
        stateName: stateName.toLowerCase(),
      })
      .select([
        'stormData.year',
        'stormData.month',
        'stormData.day',
        'stormData.maxSustainedWindKnots',
        'stormData.latitude',
        'stormData.longitude',
        'stormData.headerData',
      ])
      .where(
        `ST_Contains(
      state.geometry,
      ST_SetSRID(ST_MakePoint(stormData.longitude, stormData.latitude), 4326)
        )`,
      )
      .andWhere('stormData.year >= :year', { year: 1900 })
      .getRawMany();

    return data;

    //group by headerData,
    // get maxWindSpeed from group,
    // get earliest date from group+
    // retrieve header data name for each
  }
}
