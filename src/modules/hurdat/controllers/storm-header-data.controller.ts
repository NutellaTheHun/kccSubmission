import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { StormHeader } from '../entities/storm-header';

@Controller('stormHeaderData')
export class StormHeaderDataController extends ControllerBase<StormHeader> {}
