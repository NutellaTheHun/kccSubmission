import { ServiceBase } from 'src/base/service-base';
import { StormHeaderData } from '../entities/storm-header-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StormHeaderDataService extends ServiceBase<StormHeaderData> {}
