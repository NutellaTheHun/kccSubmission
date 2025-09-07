import { Controller, Get, Post } from '@nestjs/common';
import { RecordIdentifier } from '../entities/record-identifier';
import { ControllerBase } from 'src/base/controller-base';

@Controller('recordIdentifier')
export class RecordIdentifierController extends ControllerBase<RecordIdentifier> {}
