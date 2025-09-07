import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { StormData } from '../entities/storm-data';

Controller('stormData');
export class StormDataController extends ControllerBase<StormData> {}
