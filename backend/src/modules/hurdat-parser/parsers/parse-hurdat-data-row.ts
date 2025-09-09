import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function parseHurdatDataRow(row: any): HurdatDataRow {
  return {
    y_m_d: row['0'],
    hoursUTC_minutes: row['1'],
    recordIdentifier: row['2'],
    systemStatus: row['3'],
    latitude_hemis: row['4'],
    longitude_hemis: row['5'],
    maxSusWind: row['6'],
    minPressure: row['7'],
    NE34: row['8'].trim(),
    SE34: row['9'],
    SW34: row['10'],
    NW34: row['11'],
    NE50: row['12'],
    SE50: row['13'],
    SW50: row['14'],
    NW50: row['15'],
    NE64: row['16'],
    SE64: row['17'],
    SW64: row['18'],
    NW64: row['19'],
    radiusMaxWind: row['20'],
  } as HurdatDataRow;
}
