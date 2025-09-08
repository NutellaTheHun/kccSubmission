import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { StormHeader } from '../entities/storm-header';
import { StormHeaderService } from '../services/storm-header.service';

@Controller('stormHeader')
export class StormHeaderController extends ControllerBase<StormHeader> {
  constructor(service: StormHeaderService) {
    super(service);
  }
}
