import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStormHeaderDto {
  @IsString()
  @IsNotEmpty()
  readonly location: string;

  @IsNumber()
  @IsNotEmpty()
  readonly ATCFCycloneNumber: number;

  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly entries: number;
}
