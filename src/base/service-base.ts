import { NotImplementedException } from '@nestjs/common';
import { ObjectLiteral, Repository } from 'typeorm';

export abstract class ServiceBase<T extends ObjectLiteral> {
  constructor(private readonly entityRepo: Repository<T>) {}

  public async create(createDto: any): Promise<T> {
    throw new NotImplementedException();
  }

  public async update(id: number, updateDto: any): Promise<T> {
    throw new NotImplementedException();
  }

  public async findAll(options?: {}): Promise<T[]> {
    throw new NotImplementedException();
  }

  public async findOne(id: number): Promise<T> {
    throw new NotImplementedException();
  }

  public async remove(id: number): Promise<boolean> {
    throw new NotImplementedException();
  }
}
