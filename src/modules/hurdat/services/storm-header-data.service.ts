import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/base/service-base';
import { StormHeader } from '../entities/storm-header';

@Injectable()
export class StormHeaderDataService extends ServiceBase<StormHeader> {}
