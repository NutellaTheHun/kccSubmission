import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWindRadiiMaxExtentDto {
  @IsNumber()
  @IsNotEmpty()
  ne34: number;

  @IsNumber()
  @IsNotEmpty()
  se34: number;

  @IsNumber()
  @IsNotEmpty()
  sw34: number;

  @IsNumber()
  @IsNotEmpty()
  nw34: number;

  @IsNumber()
  @IsNotEmpty()
  ne50: number;

  @IsNumber()
  @IsNotEmpty()
  se50: number;

  @IsNumber()
  @IsNotEmpty()
  sw50: number;

  @IsNumber()
  @IsNotEmpty()
  nw50: number;

  @IsNumber()
  @IsNotEmpty()
  ne64: number;

  @IsNumber()
  @IsNotEmpty()
  se64: number;

  @IsNumber()
  @IsNotEmpty()
  sw64: number;

  @IsNumber()
  @IsNotEmpty()
  nw64: number;
}
