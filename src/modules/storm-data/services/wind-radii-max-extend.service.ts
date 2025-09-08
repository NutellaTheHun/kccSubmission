import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBase } from 'src/base/service-base';
import { Repository } from 'typeorm';
import { WindRadiiMaxExtentData } from '../entities/wind-radii-max-extent-data';

@Injectable()
export class WindRadiiMaxExtentDataService extends ServiceBase<WindRadiiMaxExtentData> {
  constructor(
    @InjectRepository(WindRadiiMaxExtentData)
    repo: Repository<WindRadiiMaxExtentData>,
  ) {
    super(repo);
  }
}
