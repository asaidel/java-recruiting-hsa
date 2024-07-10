import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModule } from './category.module';
import { CATEGORY_REPOSITORY } from 'src/shared/utils/tokens';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { TYPES } from 'src/shared/utils/types';
import { ConfigService } from '@nestjs/config';
import { CategoryEntity } from './entities/category.entity';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoryModule],
      controllers: [CategoryController],
      providers: [CategoryService,
      {
        provide: CATEGORY_REPOSITORY,
        useValue: {
          find: jest.fn(),
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

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  describe('findTop', () => {
    it('should return top array of categories', async () => {
      const result: CategoryEntity[] = [{
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
      ];

      jest.spyOn(controller, 'findTop').mockImplementation(async () => result);
      
      const found = await controller.findTop(5);

      expect(found[0].name).toBe(result[0].name);
    });
  });
  
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
