import { PartialType } from '@nestjs/swagger';
import { CreateStormHeaderDto } from './create-storm-header.dto';

export class UpdateStormHeaderDataDto extends PartialType(
  CreateStormHeaderDto,
) {}
