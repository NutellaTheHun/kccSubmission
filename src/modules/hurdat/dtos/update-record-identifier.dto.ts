import { PartialType } from '@nestjs/swagger';
import { CreateRecordIdentifierDto } from './create-record-identifier.dto';

export class UpdateRecordIdentifierDto extends PartialType(
  CreateRecordIdentifierDto,
) {}
