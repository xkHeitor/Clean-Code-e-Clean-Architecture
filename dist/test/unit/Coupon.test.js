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
const Coupon_1 = __importDefault(require("../../src/domain/entity/Coupon"));
describe('Coupon', () => {
    it('Should create a discount coupon', () => __awaiter(void 0, void 0, void 0, function* () {
        const coupon = new Coupon_1.default("APP35", 35);
        const isExpired = coupon.isExpired(new Date("2022-01-01T03:00:00"));
        expect(isExpired).toBeFalsy();
    }));
    it('Should create a discount coupon and calculate discount', () => __awaiter(void 0, void 0, void 0, function* () {
        const coupon = new Coupon_1.default("APP35", 35);
        const discount = coupon.calculateDiscount(1000);
        expect(discount).toBe(350);
    }));
    it('Should create a expired discount coupon', () => __awaiter(void 0, void 0, void 0, function* () {
        const coupon = new Coupon_1.default("APP35", 35, new Date("2021-01-01T03:00:00"));
        const isExpired = coupon.isExpired(new Date("2022-01-01T03:00:00"));
        expect(isExpired).toBeTruthy();
    }));
});
