import { IsNotEmpty, IsOptional, isString, IsString } from 'class-validator';

export class CreateRecordIdentifierDto {
  @IsString()
  @IsNotEmpty()
  readonly identifier: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
