import { Injectable } from '@nestjs/common';
import { ServiceBase } from 'src/base/service-base';
import { RecordIdentifier } from '../entities/record-identifier';

@Injectable()
export class RecordIdentifierService extends ServiceBase<RecordIdentifier> {}
