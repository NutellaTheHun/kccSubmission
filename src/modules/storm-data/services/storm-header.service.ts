import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBase } from 'src/base/service-base';
import { Repository } from 'typeorm';
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
