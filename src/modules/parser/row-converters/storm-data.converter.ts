import { CreateStormDataDto } from 'src/modules/hurdat/dtos/create-storm-data.dto';
import { StormDataRow } from '../data-types/storm-data-row.type';

export function stormDataToDto(
  row: StormDataRow,
  stormHeaderId: number,
  WRMId?: number,
): CreateStormDataDto {
  const year = row.y_m_d;
  const month = row.y_m_d;
  const day = row.y_m_d;
  const hoursUTC = row.hoursUTC_minutes;
  const minutes = row.hoursUTC_minutes;
  const latitude = Number(row.latitude_hemis);
  const hemisphereNS = row.latitude_hemis;
  const longitude = Number(row.longitude_hemis);
  const hemisphereEW = row.longitude_hemis;

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
    windRadiiMaxDataId: WRMId ?? undefined,
    recordIdentifier: row.recordIdentifier,
    systemStatus: row.systemStatus,
  } as CreateStormDataDto;
}
