import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { CouponService } from 'src/coupon/coupon.service';
import { Dashboard } from './entities/dashboard.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { CouponEntity } from 'src/coupon/entities/coupon.entity';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly couponService: CouponService,
    private readonly categoryService: CategoryService,
    private readonly logger: WinstonLoggerService
  ) { }

  async getDashboard(num: Readonly<number>): Promise<Readonly<Dashboard>> {
    try {
      const categories: CategoryEntity[] = await this.categoryService.findTop(num);
      const coupons: CouponEntity[] = await this.couponService.findNotExpired();

      return {
        categories,
        coupons,
      };
    }
    catch (error) {
      this.logger.error('error requesting dashboard');
      throw error;
    }   
  }
}
