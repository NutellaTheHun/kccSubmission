import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { StormHeaderData } from '../entities/storm-header-data';

@Controller('stormHeaderData')
export class StormHeaderDataController extends ControllerBase<StormHeaderData> {}
