import ValidateCoupon from "../../src/application/usecase/validateCoupon/ValidateCoupon";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

let connection: Connection;
let couponRepository: CouponRepository;

beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter();
    couponRepository = new CouponRepositoryDatabase(connection);
});


describe('Dimension', () => {
    
    it('Should validate if a coupon is valid', async () => {
        const validateCoupon = new ValidateCoupon(couponRepository);
        const isValid = validateCoupon.execute("APP35");
        expect(isValid).toBeTruthy();
    });

});

afterEach(async () => {
    await connection.close();
});