import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { ServiceBase } from './service-base';

export abstract class ControllerBase<T extends ObjectLiteral> {
  constructor(private readonly entityService: ServiceBase<T>) {}

  @Post()
  async create(@Body() createDto: any): Promise<T> {
    return await this.entityService.create(createDto);
  }

  @Get()
  async findAll(@Query() columns: string[]): Promise<T[]> {
    return await this.entityService.findAll({ columns });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T | null> {
    return await this.entityService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: any): Promise<T> {
    return await this.entityService.update(Number(id), updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<boolean> {
    return await this.entityService.remove(Number(id));
  }
}
