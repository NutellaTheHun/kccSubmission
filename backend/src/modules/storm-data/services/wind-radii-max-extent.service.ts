import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../../base/service-base';
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
