import { HurdatHeaderRow } from '../data-types/hurdat-header-row.type';

/**
 * A simple utility function to translate the csv parser output into a hurdat header object.
 * @param row A row passed by the csv parser in the hurdat-parser service.
 * @returns a hurdat header row as an object
 */
export function parseHurdatHeaderRow(row: any): HurdatHeaderRow {
  return {
    location_cycloneNumber_year: row['0'],
    name: row['1'],
    entryCount: row['2'],
  } as HurdatHeaderRow;
}
