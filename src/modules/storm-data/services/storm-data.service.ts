import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBase } from 'src/base/service-base';
import { Repository } from 'typeorm';
import { StormData } from '../entities/storm-data';

@Injectable()
export class StormDataService extends ServiceBase<StormData> {
  constructor(
    @InjectRepository(StormData)
    repo: Repository<StormData>,
  ) {
    super(repo);
  }
}
