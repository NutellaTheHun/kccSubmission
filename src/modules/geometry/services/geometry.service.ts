import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from '../entities/state.entity';

@Injectable()
export class GeometryService {
  constructor(
    @InjectRepository(State)
    private readonly repo: Repository<State>,
  ) {}

  async stateContainsPoint(
    statename: string,
    lon: number,
    lat: number,
  ): Promise<boolean> {
    const stateNameLower = statename.toLowerCase();

    const count = await this.repo
      .createQueryBuilder('state')
      .where(
        'LOWER(state.name) = :stateNameLower AND ST_Contains(state.geometry, ST_SetSRID(ST_MakePOINT(:lon, :lat), 4326))',
        { stateNameLower, lon, lat },
      )
      .getCount();

    return count > 0;
  }

  async findOneByName(name: string) {
    const nameLower = name.toLowerCase();

    return await this.repo
      .createQueryBuilder('state')
      .select(['state.gid', 'state.name'])
      .where('LOWER(state.name) = :nameLower', { nameLower })
      .getOne();
  }

  async findAll() {
    return await this.repo
      .createQueryBuilder('state')
      .select(['state.gid', 'state.name'])
      .getMany();
  }

  async getQueryBuilder() {
    return await this.repo.createQueryBuilder();
  }
}
