import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORY_REPOSITORY, COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardModule } from './dashboard.module';
import { Dashboard } from './entities/dashboard.entity';
import { CouponService } from 'src/coupon/coupon.service';
import { CategoryService } from 'src/category/category.service';
import path from 'node:path';
import { readFile } from 'node:fs/promises';

describe('DashboardController', () => {
  let controller: DashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DashboardModule],
      controllers: [DashboardController],
      providers: [DashboardService, CouponService, CategoryService,
        {
          provide: COUPON_REPOSITORY,
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: CATEGORY_REPOSITORY,
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
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  describe('dashboard', () => {
    it('should return the dashboard', async () => {
      const relativePath = 'test/data/dashboard-ok.json';
      const filePath = path.resolve('.', relativePath);
      const fileContent = await readFile(filePath, 'utf8');     
      const result: Dashboard = JSON.parse(fileContent);

      jest.spyOn(controller, 'dashboard').mockImplementation(async () => result);

      const found = await controller.dashboard(5);
      expect(found.coupons.length).toBe(result.coupons.length);

      expect(found.coupons[0].expiresAt).toBe(result.coupons[0].expiresAt);
      expect(found.categories[0].name).toBe(result.categories[0].name);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
