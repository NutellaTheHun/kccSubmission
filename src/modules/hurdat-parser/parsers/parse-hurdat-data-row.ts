import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function parseHurdatDataRow(row: any): HurdatDataRow {
  return {
    y_m_d: row['0'],
    hoursUTC_minutes: row['1'],
    recordIdentifier: row['2'],
    systemStatus: row['3'],
    latitude_hemis: row['4'],
    longitude_hemis: row['5'],
    minPressure: row['6'],
    NE34: row['7'],
    SE34: row['8'],
    SW34: row['9'],
    NW34: row['10'],
    NE50: row['11'],
    SE50: row['12'],
    SW50: row['13'],
    NW50: row['14'],
    NE64: row['15'],
    SE64: row['16'],
    SW64: row['17'],
    NW64: row['18'],
    radiusMaxWind: row['19'],
  } as HurdatDataRow;
}
