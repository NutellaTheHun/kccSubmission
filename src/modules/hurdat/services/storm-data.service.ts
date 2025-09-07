import { ServiceBase } from 'src/base/service-base';
import { StormData } from '../entities/storm-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StormDataService extends ServiceBase<StormData> {}
