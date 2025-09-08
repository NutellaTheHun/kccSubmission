import { CreateStormDataDto } from 'src/modules/storm-data/dtos/create-storm-data.dto';
import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function hurdatDataToDto(
  row: HurdatDataRow,
  stormHeaderId: number,
  WRMId?: number,
): CreateStormDataDto {
  const year = Number(row.y_m_d.slice(0, 4));
  const month = Number(row.y_m_d.slice(4, 6));
  const day = Number(row.y_m_d.slice(6, 8));
  const hoursUTC = Number(row.hoursUTC_minutes.slice(0, 2));
  const minutes = Number(row.hoursUTC_minutes.slice(2, 4));
  const latitude = Number(row.latitude_hemis.slice(0, 4));
  const hemisphereNS = row.latitude_hemis.slice(4, 5);
  const longitude = Number(row.longitude_hemis.slice(0, 4));
  const hemisphereEW = row.longitude_hemis.slice(4, 5);

  return {
    year,
    month,
    day,
    hoursUTC,
    minutes,
    latitude,
    hemisphereNS,
    longitude,
    hemisphereEW,
    maxSustainedWindKnots: row.maxSusWind,
    minPressureMillibars: row.minPressure,
    radiusMaxWindNauticalMiles: row.radiusMaxWind,
    headerDataId: stormHeaderId,
    windRadiiMaxDataId: WRMId || undefined,
    recordIdentifier: row.recordIdentifier ?? undefined,
    systemStatus: row.systemStatus,
  } as CreateStormDataDto;
}
