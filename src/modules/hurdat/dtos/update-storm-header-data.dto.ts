import { PartialType } from '@nestjs/swagger';
import { CreateStormHeaderDataDto } from './create-storm-header-data.dto';

export class UpdateStormHeaderDataDto extends PartialType(
  CreateStormHeaderDataDto,
) {}
