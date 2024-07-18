import { Injectable } from '@nestjs/common';
import { CouponService } from './coupon/coupon.service';
import { CategoryService } from './category/category.service';

@Injectable()
export class AppService {   
    constructor(     
      private readonly couponService: CouponService,
      private readonly categoryService: CategoryService,
    ) { }

async getDashboard(num: number) {
    const categories = await this.categoryService.findTop(num);
    const coupons = await this.couponService.findNotExpired();

    const dashboard = {
      categories,
      coupons,
    };

    return dashboard;
  }
}
