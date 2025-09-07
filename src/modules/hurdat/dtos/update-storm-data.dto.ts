import { PartialType } from '@nestjs/swagger';
import { CreateStormDataDto } from './create-storm-data.dto';

export class UpdateStormDataDto extends PartialType(CreateStormDataDto) {}
