import { NotImplementedException } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStormHeaderDataDto {
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsNumber()
  @IsNotEmpty()
  ATCFCycloneNumber: number;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  entries: number;
}
