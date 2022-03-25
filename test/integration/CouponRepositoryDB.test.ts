import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";

describe("Coupon Repository Database", () => {

    it("Should test the repository of coupon", async () => {
        const connection = new PostgresSQLConnectionAdapter();
        const couponRepository = new CouponRepositoryDatabase(connection);
        const coupon = await couponRepository.getByCode("APP35");
        expect(coupon?.code).toBe("APP35");
        await connection.close();
    });

});