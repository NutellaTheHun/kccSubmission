import { CreateWindRadiiMaxExtentDto } from 'src/modules/storm-data/dtos/create-wind-radii-max-extent-data.dto';
import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function WRMToDto(row: HurdatDataRow): CreateWindRadiiMaxExtentDto {
  return {
    ne34: row.NE34,
    se34: row.SE34,
    sw34: row.SW34,
    nw34: row.NW34,
    ne50: row.NE50,
    se50: row.SE50,
    sw50: row.SW50,
    nw50: row.NW50,
    ne64: row.NE64,
    se64: row.SE64,
    sw64: row.SW64,
    nw64: row.NW64,
  } as CreateWindRadiiMaxExtentDto;
}
