"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderCode_1 = __importDefault(require("../../src/domain/entity/OrderCode"));
describe("OrderCode", () => {
    it("Should create code of order", () => {
        const date = new Date("2021-03-01T10:00:00");
        const sequence = 1;
        const orderCode = new OrderCode_1.default(date, sequence);
        const code = orderCode.value;
        expect(code).toBe("202100000001");
    });
});
