import { Module } from '@nestjs/common';
import { GeometryModule } from '../geometry/geometry.module';
import { StormDataModule } from '../storm-data/storm-data.module';
import { ReportService } from './services/report.service';

@Module({
  imports: [GeometryModule, StormDataModule],
  controllers: [],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
