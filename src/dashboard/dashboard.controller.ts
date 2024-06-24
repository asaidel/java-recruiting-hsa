import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './entities/dashboard.entity';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  public async dashboard(@Query('limit') num: Readonly<number>): Promise<Readonly<Dashboard>> {
    return await this.dashboardService.getDashboard(num);
  }
}
