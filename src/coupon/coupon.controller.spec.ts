import { Test, TestingModule } from '@nestjs/testing';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponEntity } from './entities/coupon.entity';
import { COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CouponModule } from './coupon.module';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';
import fs, { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('CouponController', () => {
  let controller: CouponController;
  let service: CouponService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CouponModule],
      controllers: [CouponController],
      providers: [CouponService,
        {
          provide: COUPON_REPOSITORY,
          useValue: {
            find: jest.fn(),
          },
        },
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
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          }
        }],
    }).compile();

    controller = module.get<CouponController>(CouponController);
    service = module.get<CouponService>(CouponService);
  });

  describe('findNotExpired', () => {
    it('should return an array of coupons', async () => {
      const relativePath = 'test/data/coupons-ok.json';
      const filePath = path.resolve('.', relativePath);
      const fileContent = await readFile(filePath, 'utf8');     
      const result: CouponEntity[] = JSON.parse(fileContent);

      jest.spyOn(service, 'findNotExpired').mockImplementation(async () => result);

      const found = await controller.findNotExpired();
      expect(found.length).toBe(result.length);

      expect(found[0].expiresAt).toBe(result[0].expiresAt);
      expect(found[0].description).toBe(result[0].description);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

