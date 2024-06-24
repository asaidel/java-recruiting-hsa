import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponRepository } from './repositories/coupon.repository';
import { CouponEntity } from './entities/coupon.entity';
import { COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';

@Injectable()
export class CouponService {
  constructor(
    @Inject(COUPON_REPOSITORY) private readonly couponRepository: CouponRepository,    
    @Inject(CACHE_MANAGER) private cacheManager: Cache,    
    private readonly logger: WinstonLoggerService
  ) { }

  async findNotExpired(): Promise<CouponEntity[]> {
    const today : Readonly<Date> = new Date();
    today.setHours(0, 0, 0, 0);

    const cachedCoupons : CouponEntity[] = await this.cacheManager.get('couponsFiltered');
    if (cachedCoupons) {
      return cachedCoupons;
    }

    let coupons: CouponEntity[];
    try {
      coupons = await this.couponRepository.findAll();
 //     throw new UnprocessableEntityException('error requesting coupons');
    } catch (error) {
      this.logger.error('error requesting coupons');
      throw error;
    }
    const couponsFiltered : CouponEntity[] = coupons.filter(coupon => today < new Date(coupon.expiresAt));
    await this.cacheManager.set('couponsFiltered', couponsFiltered);
    return couponsFiltered;
}




create(createCouponDto: CreateCouponDto) {
  return 'This action adds a new coupon';
}

findOne(id: number) {
  return `This action returns a #${id} coupon`;
}

update(id: number, updateCouponDto: UpdateCouponDto) {
  return `This action updates a #${id} coupon`;
}

remove(id: number) {
  return `This action removes a #${id} coupon`;
}
}
