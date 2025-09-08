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

    const result = await this.repo
      .createQueryBuilder('state')
      .where(
        'state.name = :stateNameLower AND ST_Contains(state.geometry, ST_SetSRID(ST_MakePOINT(:lon, :lat), 4326))',
        { stateNameLower, lon, lat },
      )
      .getRawOne();

    return !!result?.contained;
  }
}
