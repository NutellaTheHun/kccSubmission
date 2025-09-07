import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSystemStatusDto {
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsOptional()
  description?: string;
}
