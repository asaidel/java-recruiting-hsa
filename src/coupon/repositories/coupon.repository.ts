import { Coupon } from "../dto/coupon.dto";

export interface CouponRepository {
    findAll(): Promise<Coupon[]>;
}