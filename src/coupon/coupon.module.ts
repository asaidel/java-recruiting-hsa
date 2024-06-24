import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponAxiosRepository } from './repositories/coupon.repository-axios';
import { COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { TYPES } from 'src/shared/utils/types';
import { AxiosService } from 'src/shared/infrastructure/http-client/axios.service';
import { CacheModule } from '@nestjs/cache-manager';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';

@Module({
  imports: [CacheModule.register({
    ttl: 86400000 
  })],
  controllers: [CouponController],
  providers: [ 
    WinstonLoggerService,
    CouponService,
    {
      provide: COUPON_REPOSITORY,
      useClass: CouponAxiosRepository,
    },
    {
      provide: TYPES.HttpClientService,
      useClass: AxiosService,
    }
  ],
  exports: [CouponService],
})
export class CouponModule { }
