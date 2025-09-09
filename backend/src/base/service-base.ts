import { NotImplementedException } from '@nestjs/common';
import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { InsertResult } from 'typeorm/browser';

export abstract class ServiceBase<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  public async create(createDto: any): Promise<T> {
    try {
      return await this.repo.save(createDto);
    } catch (err) {
      throw err;
    }
  }

  public async insertEntities(entities: any[]): Promise<InsertResult> {
    try {
      const result = await this.repo.insert(entities);
      return result;
    } catch (err) {
      throw err;
    }
  }

  public async update(id: number, updateDto: any): Promise<T> {
    throw new NotImplementedException();
  }

  public async findAll(options?: { columns: string[] }): Promise<T[]> {
    const query = this.repo.createQueryBuilder();

    if (options?.columns?.length) {
      query.select(options?.columns);
    }

    return await query.getMany();
  }

  public async findOne(
    id: number,
    options?: {
      columns: string[];
    },
  ): Promise<T | null> {
    const query = this.repo.createQueryBuilder();

    query.where({ id: id });

    if (options?.columns?.length) {
      query.select(options.columns);
    }

    return await query.getOne();
  }

  public async remove(id: number): Promise<boolean> {
    return (await this.repo.delete(id)).affected !== 0;
  }

  public getQueryBuilder(alias?: string): SelectQueryBuilder<T> {
    return this.repo.createQueryBuilder(alias);
  }
}
