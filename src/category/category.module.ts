import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { HttpModule } from '@nestjs/axios';
import { TYPES } from 'src/shared/utils/types';
import { AxiosService } from 'src/shared/infrastructure/http-client/axios.service';
import { CATEGORY_REPOSITORY } from 'src/shared/utils/tokens';
import { CategoryAxiosRepository } from './repositories/category.repository-axios';
import { WinstonLoggerService } from 'src/shared/infrastructure/logger/winston-logger.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule],
  controllers: [CategoryController],
  providers: [
    WinstonLoggerService,
    ConfigService,
    CategoryService,
    {
      provide: CATEGORY_REPOSITORY,
      useClass: CategoryAxiosRepository,
    },
    {
      provide: TYPES.HttpClientService,
      useClass: AxiosService,
    }],
    exports: [CategoryService, WinstonLoggerService],
})
export class CategoryModule {}
