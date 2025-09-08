import { Inject, Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import fs from 'fs';
import { StormDataService } from '../storm-data/services/storm-data.service';
import { StormHeaderService } from '../storm-data/services/storm-header.service';
import { WindRadiiMaxExtentDataService } from '../storm-data/services/wind-radii-max-extend.service';
import { hurdatDataToStormDataDto } from './hurdat-converters/hurdat-data.converter';
import { hurdatHeaderToStormHeaderDto } from './hurdat-converters/hurdat-header.converter';
import { hurdatDataToWRMDto } from './hurdat-converters/hurdat-wrm.converter';
import { parseHurdatDataRow } from './parsers/parse-hurdat-data-row';
import { parseHurdatHeaderRow } from './parsers/parse-hurdat-header-row';

@Injectable()
export class HurdatParserService {
  constructor(
    @Inject()
    private readonly stormDataService: StormDataService,
    @Inject()
    private readonly stormHeaderService: StormHeaderService,
    @Inject()
    private readonly WRMService: WindRadiiMaxExtentDataService,
  ) {}

  async parseHurdat2CSV(filePath: string) {
    let dataRowCount = 0;
    let headerId = 0;
    let WRMId = 0;

    return new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: false }))
        .on('data', async (row: any) => {
          try {
            if (dataRowCount === 0) {
              const headerRow = parseHurdatHeaderRow(row);

              const headerEntity = await this.stormHeaderService.create(
                hurdatHeaderToStormHeaderDto(headerRow),
              );

              dataRowCount = headerRow.entryCount;
              headerId = headerEntity.id;
            } else {
              WRMId = 0;

              const dataRow = parseHurdatDataRow(row);

              if (dataRow.NE34 !== -999) {
                const WRMDTO = hurdatDataToWRMDto(dataRow);
                const WRMEntity = await this.WRMService.create(WRMDTO);
                WRMId = WRMEntity.id;
              }

              const stormDataDto = hurdatDataToStormDataDto(
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
