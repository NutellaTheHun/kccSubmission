import { CreateStormHeaderDto } from 'src/modules/storm-data/dtos/create-storm-header.dto';
import { HurdatHeaderRow } from '../data-types/hurdat-header-row.type';

export function hurdatHeaderToStormHeaderDto(
  row: HurdatHeaderRow,
): CreateStormHeaderDto {
  const location = row.location_cycloneNumber_year.slice(0, 2);
  const ATCFCycloneNumber = Number(row.location_cycloneNumber_year.slice(2, 4));
  const year = Number(row.location_cycloneNumber_year.slice(4, 8));
  const entries = Number(row.entryCount);

  return {
    location,
    ATCFCycloneNumber,
    year,
    name: row.name || undefined,
    entries,
  } as CreateStormHeaderDto;
}
