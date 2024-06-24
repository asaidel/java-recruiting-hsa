import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CouponModule } from './coupon/coupon.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/infrastructure/http-exception.filter';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DashboardModule, CouponModule, CategoryModule, HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['default.env'],
      cache: true,
    })], 
  providers: [
    {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }],
})
export class AppModule { }