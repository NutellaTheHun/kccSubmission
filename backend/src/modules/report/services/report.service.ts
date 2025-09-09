import { Inject, Injectable } from '@nestjs/common';
import { State } from '../../geometry/entities/state.entity';
import { StormDataService } from '../../storm-data/services/storm-data.service';
import { StormOverlapStateDto } from '../dtos/stormOverlapState.dto';

@Injectable()
export class ReportService {
  constructor(
    @Inject()
    private readonly dataService: StormDataService,
  ) {}

  /**
   *
   * @param stateName name of state that searches for name in State table
   * @param options current options to sort resulting columns
   * @returns
   */
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
        'header.id AS headerId',
        'header.name AS stormName',
        'MAX(sd.maxSustainedWindKnots) AS maxWind',
        'MIN(MAKE_DATE(sd.year, sd.month, sd.day)) AS "landDate"',
      ])
      .where(
        `ST_Contains(
         state.geometry,
         ST_SetSRID(ST_MakePoint(sd.longitude, sd.latitude), 4326)
       )`,
      )
      .andWhere('sd.year >= :year', { year: 1900 })
      .groupBy('header.id, header.name');

    const sortColumns: Record<string, string> = {
      name: 'header.name',
      maxWindSpeed: 'MAX(sd.maxSustainedWindKnots)',
      date: 'MIN(MAKE_DATE(sd.year, sd.month, sd.day))',
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

    return data.map((row) => {
      const date = new Date(row.landDate);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });

      return {
        id: row.id,
        name: row.stormname,
        date: formattedDate,
        maxWindSpeed: Number(row.maxwind),
      } as StormOverlapStateDto;
    });
  }
}
