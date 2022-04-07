"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidateCoupon_1 = __importDefault(require("../../src/application/usecase/validateCoupon/ValidateCoupon"));
const PostgresSQLConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PostgresSQLConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/CouponRepositoryDatabase"));
let connection;
let couponRepository;
beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter_1.default();
    couponRepository = new CouponRepositoryDatabase_1.default(connection);
});
describe('Dimension', () => {
    it('Should validate if a coupon is valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const validateCoupon = new ValidateCoupon_1.default(couponRepository);
        const isValid = yield validateCoupon.execute("APP35");
        expect(isValid).toBeTruthy();
    }));
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
