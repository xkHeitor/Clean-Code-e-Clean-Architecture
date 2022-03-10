import CouponRepository from "../../../domain/repository/CouponRepository";

export default class ValidateCoupon {

    constructor(readonly couponRepository: CouponRepository){}

    execute(code: string): boolean {
        const coupon = this.couponRepository.getByCode(code);
        if (!coupon) return false;
        return !coupon.isExpired();
    }

}