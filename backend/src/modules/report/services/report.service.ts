import { Inject, Injectable } from '@nestjs/common';
import { State } from '../../geometry/entities/state.entity';
import { GeometryService } from '../../geometry/services/geometry.service';
import { StormDataService } from '../../storm-data/services/storm-data.service';
import { StormHeaderService } from '../../storm-data/services/storm-header.service';
import { StormOverlapStateDto } from '../dtos/stormOverlapState.dto';

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

  async stormOverlapState(
    stateName: string,
    options?: { sortBy: string; sortOrder: string },
  ): Promise<StormOverlapStateDto[]> {
    const query = this.dataService.getQueryBuilder('sd');

    query
      .innerJoin(State, 'state', 'LOWER(state.name) = :stateName', {
        stateName: stateName.toLowerCase(),
      })
      .innerJoin('sd.headerData', 'header')
      .select([
        'sd.id AS stormDataId',
        'header.id AS headerId',
        'header.name AS stormName',
        'MAX(sd.maxSustainedWindKnots) AS maxWind',
        'MIN(MAKE_DATE(sd.year, sd.month, sd.day)) AS firstDate',
      ])
      .where(
        `ST_Contains(
         state.geometry,
         ST_SetSRID(ST_MakePoint(sd.longitude, sd.latitude), 4326)
       )`,
      )
      .andWhere('sd.year >= :year', { year: 1900 })
      .groupBy('sd.id, header.id, header.name');

    const sortColumns: Record<string, string> = {
      stormName: 'header.name',
      maxWind: 'MAX(sd.maxSustainedWindKnots)',
      firstDate: 'MIN(MAKE_DATE(sd.year, sd.month, sd.day))',
    };

    if (options?.sortBy && options.sortOrder) {
      const column = sortColumns[options.sortBy];
      if (column) {
        query.orderBy(
          column,
          options.sortOrder.toUpperCase() as 'ASC' | 'DESC',
        );
      }
    }

    const data = await query.getRawMany();

    return data.map(
      (row) =>
        ({
          id: row.id,
          name: row.stormname,
          date: row.firstdate,
          maxWindSpeed: Number(row.maxwind),
        }) as StormOverlapStateDto,
    );
  }
}
