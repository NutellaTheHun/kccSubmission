import {
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  NotImplementedException,
} from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { ServiceBase } from './service-base';

export abstract class ControllerBase<T extends ObjectLiteral> {
  constructor(entityService: ServiceBase<T>) {}

  @Post()
  async create(@Body() createDto: Promise<T>) {
    throw new NotImplementedException();
  }

  @Get()
  async findAll(@Query() query: string): Promise<T[]> {
    throw new NotImplementedException();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T> {
    throw new NotImplementedException();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: Promise<T>) {
    throw new NotImplementedException();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
