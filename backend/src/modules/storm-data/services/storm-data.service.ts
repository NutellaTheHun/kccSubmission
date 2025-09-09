import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceBase } from '../../../base/service-base';
import { CreateStormDataDto } from '../dtos/create-storm-data.dto';
import { StormData } from '../entities/storm-data';

@Injectable()
export class StormDataService extends ServiceBase<StormData> {
  constructor(
    @InjectRepository(StormData)
    repo: Repository<StormData>,
  ) {
    super(repo);
  }

  override async create(createDto: CreateStormDataDto): Promise<StormData> {
    const entity = this.repo.create({
      ...createDto,
      headerData: { id: createDto.headerId },
      windRadiiMaxData: createDto.windRadiiMaxDataId
        ? { id: createDto.windRadiiMaxDataId }
        : null,
    });

    return await this.repo.save(entity);
  }
}
