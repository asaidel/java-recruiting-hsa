import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORY_REPOSITORY, COUPON_REPOSITORY } from 'src/shared/utils/tokens';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { DashboardModule } from './dashboard.module';
import { Dashboard } from './entities/dashboard.entity';
import { CouponService } from 'src/coupon/coupon.service';
import { CategoryService } from 'src/category/category.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardService;

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
        },/*
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
        }*/
          ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardService>(DashboardService);
  });

  describe('dashboard', () => {
    it('should return the dashboard', async () => {
      const result: Dashboard = {
        "categories": [
            {
                "id": "MOB",
                "name": "MOBILE_MARKET",
                "subcategories": [
                    {
                        "id": "video-games",
                        "name": "Video Games",
                        "relevance": 150,
                        "subcategories": [
                            {
                                "id": "nintendo",
                                "name": "Nintendo",
                                "smallImageUrl": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
                                "subcategories": [
                                    {
                                        "id": "switch",
                                        "name": "Switch",
                                        "relevance": 422
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": "toys",
                        "name": "Toys",
                        "relevance": 99,
                        "subcategories": [
                            {
                                "id": "puzzles",
                                "name": "Puzzles",
                                "relevance": 100,
                                "smallImageUrl": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
                                "subcategories": []
                            }
                        ]
                    },
                    {
                        "id": "health",
                        "name": "Health",
                        "relevance": 6,
                        "subcategories": []
                    },
                    {
                        "id": "travel",
                        "name": "Travel",
                        "relevance": 5,
                        "subcategories": []
                    },
                    {
                        "id": "food",
                        "name": "Food",
                        "relevance": 4,
                        "subcategories": [
                            {
                                "id": "hamburger",
                                "name": "Hamburger",
                                "relevance": 350,
                                "smallImageUrl": "https://i4.visitchile.com/img/GalleryContent/8822/slider/Torres_del_Paine.jpg",
                                "subcategories": []
                            }
                        ]
                    }
                ]
            }
        ],
        "coupons": [
            {
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
        ]
    }
      ;

      jest.spyOn(controller, 'dashboard').mockImplementation(async () => result);

      const found = await controller.dashboard(5);

      expect(found.coupons[0].expiresAt).toBe(result.coupons[0].expiresAt);
      expect(found.categories[0].name).toBe(result.categories[0].name);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
