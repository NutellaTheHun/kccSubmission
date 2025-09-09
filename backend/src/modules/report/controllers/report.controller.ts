import { Controller, Get, Query } from '@nestjs/common';
import { StormOverlapStateDto } from '../dtos/stormOverlapState.dto';
import { ReportService } from '../services/report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('state-storm-overlap')
  async getStateStormOverlapReport(
    @Query('name') name: string,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string,
  ): Promise<StormOverlapStateDto[]> {
    return await this.reportService.stormOverlapState(name, {
      sortBy,
      sortOrder,
    });
  }
}
