import { Module } from '@nestjs/common';
import { GeometryModule } from '../geometry/geometry.module';
import { StormDataModule } from '../storm-data/storm-data.module';
import { ReportController } from './controllers/report.controller';
import { ReportService } from './services/report.service';

@Module({
  imports: [GeometryModule, StormDataModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
