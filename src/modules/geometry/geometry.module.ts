import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { GeometryService } from './services/geometry.service';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  controllers: [],
  providers: [GeometryService],
  exports: [GeometryService],
})
export class GeometryModule {}
