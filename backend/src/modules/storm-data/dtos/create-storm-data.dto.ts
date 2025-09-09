import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStormDataDto {
  @IsNumber()
  @IsNotEmpty()
  readonly year: number;

  @IsNumber()
  @IsNotEmpty()
  readonly month: number;

  @IsNumber()
  @IsNotEmpty()
  readonly day: number;

  @IsNumber()
  @IsNotEmpty()
  readonly hoursUTC: number;

  @IsNumber()
  @IsNotEmpty()
  readonly minutes: number;

  @IsNumber()
  @IsNotEmpty()
  readonly latitude: number;

  @IsString()
  @IsNotEmpty()
  readonly hemisphereNS: string;

  @IsNumber()
  @IsNotEmpty()
  readonly longitude: number;

  @IsString()
  @IsNotEmpty()
  readonly hemisphereEW: string;

  @IsNumber()
  @IsOptional()
  readonly maxSustainedWindKnots?: number;

  @IsNumber()
  @IsOptional()
  readonly minPressureMillibars?: number;

  @IsNumber()
  @IsOptional()
  readonly radiusMaxWindNauticalMiles?: number | null;

  @IsNumber()
  @IsNotEmpty()
  readonly headerId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly windRadiiMaxDataId: number;

  @IsString()
  @IsOptional()
  readonly recordIdentifier?: string;

  @IsString()
  @IsNotEmpty()
  readonly systemStatus: string;
}
