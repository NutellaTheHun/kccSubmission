import { HurdatHeaderRow } from '../data-types/hurdat-header-row.type';

export function parseHurdatHeaderRow(row: any): HurdatHeaderRow {
  return {
    location_cycloneNumber_year: row['0'],
    name: row['1'],
    entryCount: row['2'],
  } as HurdatHeaderRow;
}
