import { Controller } from '@nestjs/common';
import { ControllerBase } from 'src/base/controller-base';
import { SystemStatus } from '../entities/system-status';

@Controller('systemStatus')
export class SystemStatusController extends ControllerBase<SystemStatus> {}
