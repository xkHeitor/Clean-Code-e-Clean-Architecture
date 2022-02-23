import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {

    private coupons: Coupon[];

    constructor() {
        this.coupons = [
            new Coupon('APP35', 35)
        ];
    }

    getByCode(code: string): Coupon | undefined {
        return this.coupons.find(coupon => coupon.code === code);
    }

}