import { ServiceBase } from 'src/base/service-base';
import { SystemStatus } from '../entities/system-status';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class SystemStatusService extends ServiceBase<SystemStatus> {}
