import { Inject, Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import fs from 'fs';
import { StormDataService } from '../storm-data/services/storm-data.service';
import { StormHeaderService } from '../storm-data/services/storm-header.service';
import { WindRadiiMaxExtentDataService } from '../storm-data/services/wind-radii-max-extent.service';
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

  parseHurdat = async (filePath: string) => {
    let dataRowCount = 0;
    let headerId = 0;
    let WRMId = 0;

    const parser = fs
      .createReadStream(filePath)
      .pipe(csvParser({ headers: false }));

    for await (const row of parser) {
      if (dataRowCount === 0) {
        const headerRow = parseHurdatHeaderRow(row);

        const headerDto = hurdatHeaderToStormHeaderDto(headerRow);

        const headerEntity = await this.stormHeaderService.create(headerDto);

        dataRowCount = Number(headerRow.entryCount);
        headerId = headerEntity.id;
      } else {
        WRMId = 0;

        const dataRow = parseHurdatDataRow(row);

        if (dataRow.NE34 !== '-999') {
          const WRMDTO = hurdatDataToWRMDto(dataRow);
          const WRMEntity = await this.WRMService.create(WRMDTO);
          WRMId = WRMEntity.id;
        }

        const stormDataDto = hurdatDataToStormDataDto(
          dataRow,
          headerId,
          WRMId || undefined,
        );

        await this.stormDataService.create(stormDataDto);

        dataRowCount -= 1;
      }
    }
  };

  async parseHurdat2CSV(filePath: string) {
    return this.parseHurdat(filePath);
  }
}
