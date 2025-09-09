import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWindRadiiMaxExtentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly ne34: number;

  @IsNumber()
  @IsNotEmpty()
  readonly se34: number;

  @IsNumber()
  @IsNotEmpty()
  readonly sw34: number;

  @IsNumber()
  @IsNotEmpty()
  readonly nw34: number;

  @IsNumber()
  @IsNotEmpty()
  readonly ne50: number;

  @IsNumber()
  @IsNotEmpty()
  readonly se50: number;

  @IsNumber()
  @IsNotEmpty()
  readonly sw50: number;

  @IsNumber()
  @IsNotEmpty()
  readonly nw50: number;

  @IsNumber()
  @IsNotEmpty()
  readonly ne64: number;

  @IsNumber()
  @IsNotEmpty()
  readonly se64: number;

  @IsNumber()
  @IsNotEmpty()
  readonly sw64: number;

  @IsNumber()
  @IsNotEmpty()
  readonly nw64: number;
}
