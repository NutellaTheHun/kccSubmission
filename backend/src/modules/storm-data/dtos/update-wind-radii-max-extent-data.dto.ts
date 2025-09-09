import { PartialType } from '@nestjs/swagger';
import { CreateWindRadiiMaxExtentDto } from './create-wind-radii-max-extent-data.dto';

export class UpdateWindRadiiMaxExtentDto extends PartialType(
  CreateWindRadiiMaxExtentDto,
) {}
