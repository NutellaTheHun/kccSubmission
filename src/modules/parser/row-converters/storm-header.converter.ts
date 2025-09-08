import { CreateStormHeaderDto } from 'src/modules/hurdat/dtos/create-storm-header.dto';
import { StormHeaderRow } from '../data-types/storm-header-row.type';

export function stormHeaderToDto(row: StormHeaderRow): CreateStormHeaderDto {
  const location = row.location_cycloneNumber_year.slice(0, 2);
  const ATCFCycloneNumber = Number(row.location_cycloneNumber_year.slice(2, 4));
  const year = Number(row.location_cycloneNumber_year.slice(4, 8));

  return {
    location,
    ATCFCycloneNumber,
    year,
    name: row.name || undefined,
    entries: row.entryCount,
  } as CreateStormHeaderDto;
}
