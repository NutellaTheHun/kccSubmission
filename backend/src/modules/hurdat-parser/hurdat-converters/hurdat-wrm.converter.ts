import { CreateWindRadiiMaxExtentDto } from '../../storm-data/dtos/create-wind-radii-max-extent-data.dto';
import { HurdatDataRow } from '../data-types/hurdat-data-row.type';

export function hurdatDataToWRMDto(
  row: HurdatDataRow,
): CreateWindRadiiMaxExtentDto {
  return {
    ne34: Number(row.NE34),
    se34: Number(row.SE34),
    sw34: Number(row.SW34),
    nw34: Number(row.NW34),
    ne50: Number(row.NE50),
    se50: Number(row.SE50),
    sw50: Number(row.SW50),
    nw50: Number(row.NW50),
    ne64: Number(row.NE64),
    se64: Number(row.SE64),
    sw64: Number(row.SW64),
    nw64: Number(row.NW64),
  } as CreateWindRadiiMaxExtentDto;
}
