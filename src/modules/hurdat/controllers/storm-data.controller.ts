import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { StormData } from '../entities/storm-data';
import { StormDataService } from '../services/storm-data.service';

@Controller('stormData')
export class StormDataController extends ControllerBase<StormData> {
  constructor(service: StormDataService) {
    super(service);
  }
}
