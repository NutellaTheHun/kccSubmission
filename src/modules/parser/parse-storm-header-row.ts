import { StormHeaderRow } from './data-types/storm-header-row.type';

export const dataHeaderHeader = [
  'location_cycloneNumber_year',
  'name',
  'entryCount',
];
export function parseStormHeaderRow(row: any): StormHeaderRow {
  return {
    location_cycloneNumber_year: row['0'],
    name: row['1'],
    entryCount: row['2'],
  } as StormHeaderRow;
}
