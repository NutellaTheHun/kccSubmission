import { IsNotEmpty, IsString } from 'class-validator';

export class StormOverlapStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  maxWindSpeed: number;
}
