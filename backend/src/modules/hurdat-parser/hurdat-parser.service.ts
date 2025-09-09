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

  /**
   * This parser inserts data in batches into the StormData, StormHeader, and WindRadiiMaxExtent tables.
   *
   * The totalBatchCount variable controls the chunks that are parsed before a bulk insert.
   *
   * Due to StormData holding foreign keys to StormHeader and WindRadiiMaxExtent, the order that data is
   * inserted and hydration queues are used to track entities and ids.
   *
   * General algorithm:
   *
   * Load a batch:
   *  - Parse a header row: add to headerBatch, partially hydrate queue with number of entries, save number of entries
   *  - Parse data rows for the number of the entries into the dataBatch,
   *  - if the data row has WindRadiiMaxExtent(WRM) data, parse the row into the WRM batch,
   * partially hyrdate WRM queue with the row index.
   *
   * Bulk insert:
   *  - Insert header batch. With returned results, complete header queue hydration with returned IDs.
   *  - Insert WRM batch. With results, complete WRM queue hydration with returned IDs.
   *  - Hydrate data batch. Iterate through data batch and assigning the StormHeader's id by tracking
   * the queued number of entries. Then iterate through the WRM queue and assign its ID to the data batch by index.
   *  - Insert data batch.
   *
   * Reset and repeat.
   */
  parseHurdat = async (filePath: string) => {
    // Saved number of entries to properly parse header rows and data rows, and control when to batch insert.
    let totalheaderEntries = 0;
    let doneHeaderEntries = 0;

    // The size of back to insert, with the current size of the batch to control when to batch insert.
    const totalBatchCount = 100;
    let currentBatchCount = 0;

    // The batches that are inserted into the database,
    let headerBatch: CreateStormHeaderDto[] = [];
    let dataBatch: CreateStormDataDto[] = [];
    let WRMBatch: CreateWindRadiiMaxExtentDto[] = [];

    // header queue tracks the number of row entries that will require its headerId assignment for the data batch.
    let headerHydrateQueue: { rowCount: number; headerId: number }[] = [];

    // WRM queue tracks the index in the data batch that will require its entity id
    let WRMHydrateQueue: { dataBatchIndex: number; WRMId: number }[] = [];

    const parser = fs
      .createReadStream(filePath)
      .pipe(csvParser({ headers: false }));

    for await (const row of parser) {
      // Bulk Insert step
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
      // Batching loading step
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
        if (dataRow.NE34 !== '-999') {
          const WRMDTO = hurdatDataToWRMDto(dataRow);
          WRMBatch.push(WRMDTO);

          // partially hydrate WRM queue
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
