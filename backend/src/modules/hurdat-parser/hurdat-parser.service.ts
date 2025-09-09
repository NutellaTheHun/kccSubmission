import { Inject, Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import fs from 'fs';
import { CreateStormDataDto } from '../storm-data/dtos/create-storm-data.dto';
import { CreateStormHeaderDto } from '../storm-data/dtos/create-storm-header.dto';
import { CreateWindRadiiMaxExtentDto } from '../storm-data/dtos/create-wind-radii-max-extent-data.dto';
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
    let totalheaderEntries = 0;
    let doneHeaderEntries = 0;

    const totalBatchCount = 100;
    let currentBatchCount = 0;

    let headerBatch: CreateStormHeaderDto[] = [];
    let headerHydrateQueue: { rowCount: number; headerId: number }[] = [];

    let dataBatch: CreateStormDataDto[] = [];

    let WRMBatch: CreateWindRadiiMaxExtentDto[] = [];
    let WRMHydrateQueue: { dataBatchIndex: number; WRMId: number }[] = [];

    const parser = fs
      .createReadStream(filePath)
      .pipe(csvParser({ headers: false }));

    for await (const row of parser) {
      if (
        doneHeaderEntries === totalheaderEntries &&
        currentBatchCount > 0 &&
        currentBatchCount >= totalBatchCount
      ) {
        // insert StormHeader entities,
        // hydrate header queue with IDs from result
        const headerResult =
          await this.stormHeaderService.insertEntities(headerBatch);
        for (let i = 0; i < headerResult.identifiers.length; i++) {
          headerHydrateQueue[i].headerId = headerResult.identifiers[i].id;
        }

        // insert WRM entities,
        // hydrate WRM queue with IDs from result
        const WRMResult = await this.WRMService.insertEntities(WRMBatch);
        for (let i = 0; i < WRMResult.identifiers.length; i++) {
          WRMHydrateQueue[i].WRMId = WRMResult.identifiers[i].id;
        }

        // hydrate data rows with header IDs based on entries
        let hQueueIdx = 0;
        let remainingEntries = headerHydrateQueue[0].rowCount - 1;
        let headerId = headerHydrateQueue[0].headerId;
        for (let i = 0; i < dataBatch.length; i++) {
          dataBatch[i].headerId = headerId;

          // shift to next header in queue
          if (remainingEntries === 0 && i !== dataBatch.length - 1) {
            hQueueIdx += 1;
            remainingEntries = headerHydrateQueue[hQueueIdx].rowCount;
            headerId = headerHydrateQueue[hQueueIdx].headerId;
          }

          remainingEntries -= 1;
        }

        //hydrate datarows with WRM ids
        for (let i = 0; i < WRMHydrateQueue.length; i++) {
          const idx = WRMHydrateQueue[i].dataBatchIndex;
          dataBatch[idx].windRadiiMaxDataId = WRMHydrateQueue[i].WRMId;
        }

        // insert data rows
        await this.stormDataService.insertEntities(dataBatch);

        //reset
        currentBatchCount = 0;
        headerBatch = [];
        headerHydrateQueue = [];
        dataBatch = [];
        WRMBatch = [];
        WRMHydrateQueue = [];
      }
      if (doneHeaderEntries === totalheaderEntries) {
        // parse and add StormHeader to batch
        const headerRow = parseHurdatHeaderRow(row);
        const headerDto = hurdatHeaderToStormHeaderDto(headerRow);
        headerBatch.push(headerDto);

        // Set number of entries to parse StormData
        totalheaderEntries = Number(headerRow.entryCount);
        doneHeaderEntries = 0;

        //Partially hydrate header
        headerHydrateQueue.push({ rowCount: totalheaderEntries, headerId: 0 });
      } else {
        // Parse StormData
        const dataRow = parseHurdatDataRow(row);

        // Optionally, parse and add to WRM batch
        // partially hydrate WRM queue
        if (dataRow.NE34 !== '-999') {
          const WRMDTO = hurdatDataToWRMDto(dataRow);
          WRMBatch.push(WRMDTO);
          WRMHydrateQueue.push({
            dataBatchIndex: dataBatch.length,
            WRMId: 0,
          });
        }

        const stormDataDto = hurdatDataToStormDataDto(dataRow, 0, undefined);
        // Add StormData to data batch
        dataBatch.push(stormDataDto);

        doneHeaderEntries += 1;
        currentBatchCount += 1;
      }
    }
  };

  async parseHurdat2CSV(filePath: string) {
    return this.parseHurdat(filePath);
  }
}
