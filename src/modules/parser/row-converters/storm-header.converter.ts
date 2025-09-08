import { CreateStormHeaderDto } from 'src/modules/hurdat/dtos/create-storm-header.dto';
import { StormHeaderRow } from '../data-types/storm-header-row.type';

export function stormHeaderToDto(row: StormHeaderRow): CreateStormHeaderDto {
  const location = row.location_cycloneNumber_year;
  const ATCFCycloneNumber = Number(row.location_cycloneNumber_year);
  const year = Number(row.location_cycloneNumber_year);

  return {
    location,
    ATCFCycloneNumber,
    year,
    name: row.name ?? undefined,
    entries: row.entryCount,
  } as CreateStormHeaderDto;
}
