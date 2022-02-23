import Coupon from "../src/Coupon";

describe('Coupon', () => {

    it('Should create a discount coupon', async () => {
        const coupon = new Coupon("APP35", 35);
        const isExpired = coupon.isExpired(new Date("2022-01-01T03:00:00"));
        expect(isExpired).toBeFalsy();
    });

    it('Should create a discount coupon and calculate discount', async () => {
        const coupon = new Coupon("APP35", 35);
        const discount = coupon.calculateDiscount(1000);
        expect(discount).toBe(350);
    });

    it('Should create a expired discount coupon', async () => {
        const coupon = new Coupon("APP35", 35, new Date("2021-01-01T03:00:00"));
        const isExpired = coupon.isExpired(new Date("2022-01-01T03:00:00"));
        expect(isExpired).toBeTruthy();
    });

});