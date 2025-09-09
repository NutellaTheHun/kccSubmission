import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../../base/service-base';
import { StormHeader } from '../entities/storm-header';

@Injectable()
export class StormHeaderService extends ServiceBase<StormHeader> {
  constructor(
    @InjectRepository(StormHeader)
    repo: Repository<StormHeader>,
  ) {
    super(repo);
  }
}
