import { Inject, Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import fs from 'fs';
import { StormDataService } from '../hurdat/services/storm-data.service';
import { StormHeaderService } from '../hurdat/services/storm-header.service';
import { WindRadiiMaxExtentDataService } from '../hurdat/services/wind-radii-max-extend.service';
import { parseStormDataRow } from './parse-storm-data-row';
import { parseStormHeaderRow } from './parse-storm-header-row';
import { stormDataToDto } from './row-converters/storm-data.converter';
import { stormHeaderToDto } from './row-converters/storm-header.converter';
import { WRMToDto } from './row-converters/wrm.converter';

@Injectable()
export class ParserService {
  constructor(
    @Inject()
    private readonly stormDataService: StormDataService,
    @Inject()
    private readonly stormHeaderService: StormHeaderService,
    @Inject()
    private readonly WRMService: WindRadiiMaxExtentDataService,
  ) {}

  async parseCSV(filePath: string) {
    let dataRowCount = 0;
    let headerId = 0;
    let WRMId = 0;

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: false }))
        .on('data', async (row: any) => {
          try {
            if (dataRowCount === 0) {
              const headerRow = parseStormHeaderRow(row);

              const headerEntity = await this.stormHeaderService.create(
                stormHeaderToDto(headerRow),
              );

              dataRowCount = headerRow.entryCount;
              headerId = headerEntity.id;
            } else {
              WRMId = 0;

              const dataRow = parseStormDataRow(row);

              if (dataRow.NE34 !== -999) {
                const WRMDTO = WRMToDto(dataRow);
                const WRMEntity = await this.WRMService.create(WRMDTO);
                WRMId = WRMEntity.id;
              }

              const stormDataDto = stormDataToDto(
                row,
                headerId,
                WRMId || undefined,
              );

              await this.stormDataService.create(stormDataDto);

              dataRowCount -= 1;
            }
          } catch (err) {
            reject(err);
          }
        })
        .on('end', () => resolve())
        .on('error', (err) => reject(err));
    });
  }
}
