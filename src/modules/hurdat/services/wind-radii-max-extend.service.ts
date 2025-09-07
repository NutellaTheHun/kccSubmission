import { ServiceBase } from 'src/base/service-base';
import { WindRadiiMaxExtentData } from '../entities/wind-radii-max-extent-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WindRadiiMaxExtentDataService extends ServiceBase<WindRadiiMaxExtentData> {}
