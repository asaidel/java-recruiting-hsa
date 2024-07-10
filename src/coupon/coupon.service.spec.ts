import { Test, TestingModule } from '@nestjs/testing';
import { CouponService } from './coupon.service';
import { CouponEntity } from './entities/coupon.entity';
import { ConfigService } from '@nestjs/config';
import { COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { TYPES } from 'src/shared/utils/types';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CouponModule } from './coupon.module';

describe('CouponService', () => {
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CouponModule],
      providers: [CouponService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: WinstonLoggerService,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
          },
        },
        {
          provide: TYPES.HttpClientService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
        {
          provide: COUPON_REPOSITORY,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          }
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          }
        }],
    }).compile();

    service = module.get<CouponService>(CouponService);
  });

  
  describe('findNotExpired', () => {
    it('should return an array of coupons', async () => {
      const result: CouponEntity[] = [{
        "id": "COUPON_1",
        "description": "50% Discount",
        "seller": "Crazy Seller",
        "image": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
        "expiresAt": "2045-12-01"
      },
      {
        "id": "COUPON_2",
        "description": "5% Discount",
        "seller": "The Seller",
        "image": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
        "expiresAt": "2042-12-25"
      },
      {
        "id": "COUPON_4",
        "description": "1% Discount",
        "seller": "Mega Discount",
        "image": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
        "expiresAt": "2055-10-01"
      }
      ];

      jest.spyOn(service, 'findNotExpired').mockImplementation(async () => result);

      const found = await service.findNotExpired();
       
      expect(found[0].expiresAt).toBe(result[0].expiresAt);
    });
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
