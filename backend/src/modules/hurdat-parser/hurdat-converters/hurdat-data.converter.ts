import { CreateStormDataDto } from '../../storm-data/dtos/create-storm-data.dto';
import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function hurdatDataToStormDataDto(
  row: HurdatDataRow,
  stormHeaderId: number,
  WRMId?: number,
): CreateStormDataDto {
  const year = Number(row.y_m_d.slice(0, 4));
  const month = Number(row.y_m_d.slice(4, 6));
  const day = Number(row.y_m_d.slice(6, 8));
  const hoursUTC = Number(row.hoursUTC_minutes.slice(0, 2));
  const minutes = Number(row.hoursUTC_minutes.slice(2, 4));

  const hemisphereNS = row.latitude_hemis.slice(-1).toUpperCase();
  const latitudeValue = parseFloat(row.latitude_hemis.slice(0, -1));
  const latitude = hemisphereNS === 'S' ? -latitudeValue : latitudeValue;

  const hemisphereEW = row.longitude_hemis.slice(-1).toUpperCase();
  const longitudeValue = parseFloat(row.longitude_hemis.slice(0, -1));
  const longitude = hemisphereEW === 'W' ? -longitudeValue : longitudeValue;

  const recordIdentifier = row.recordIdentifier
    ? row.recordIdentifier.toUpperCase()
    : undefined;

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
    maxSustainedWindKnots:
      row.maxSusWind === '-99' ? undefined : Number(row.maxSusWind),
    minPressureMillibars:
      row.minPressure === '-999' ? undefined : Number(row.minPressure),
    radiusMaxWindNauticalMiles:
      row.radiusMaxWind === '-999' ? undefined : Number(row.radiusMaxWind),
    headerId: stormHeaderId,
    windRadiiMaxDataId: WRMId || undefined,
    recordIdentifier,
    systemStatus: row.systemStatus.toUpperCase(),
  } as CreateStormDataDto;
}
