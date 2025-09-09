import { CreateStormHeaderDto } from '../../storm-data/dtos/create-storm-header.dto';
import { HurdatHeaderRow } from '../data-types/hurdat-header-row.type';

/**
 * Converts and cleans a parsed Hurdat header row into a StormHeader dto to be inserted into the database.
 */
export function hurdatHeaderToStormHeaderDto(
  row: HurdatHeaderRow,
): CreateStormHeaderDto {
  const location = row.location_cycloneNumber_year.slice(0, 2);
  const ATCFCycloneNumber = Number(row.location_cycloneNumber_year.slice(2, 4));
  const year = Number(row.location_cycloneNumber_year.slice(4, 8));
  const entries = Number(row.entryCount);
  const name = row.name.trim();

  return {
    location,
    ATCFCycloneNumber,
    year,
    name,
    entries,
  } as CreateStormHeaderDto;
}
