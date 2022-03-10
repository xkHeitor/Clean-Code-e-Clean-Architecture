import ValidateCoupon from "../../src/application/usecase/validateCoupon/ValidateCoupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

describe('Dimension', () => {
    
    it('Should validate if a coupon is valid', async () => {
        const couponRepository = new CouponRepositoryMemory();
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = validateCoupon.execute("APP35");
        expect(isValid).toBeTruthy();
    });

});