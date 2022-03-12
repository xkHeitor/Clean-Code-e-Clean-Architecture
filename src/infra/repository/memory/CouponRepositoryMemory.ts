import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {

    private coupons: Coupon[];

    constructor() {
        this.coupons = [
            new Coupon('APP35', 35)
        ];
    }

    async getByCode(code: string): Promise<Coupon|undefined> {
        return this.coupons.find(coupon => coupon.code === code);
    }

}