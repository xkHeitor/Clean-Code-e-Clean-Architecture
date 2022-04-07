"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderItem_1 = __importDefault(require("../../src/domain/entity/OrderItem"));
describe("OrderItem", () => {
    const fakeOrderItem = { idItem: 1, price: 350, quantity: 2 };
    it("Should get total", () => {
        const orderItem = new OrderItem_1.default(fakeOrderItem.idItem, fakeOrderItem.price, fakeOrderItem.quantity);
        expect(orderItem.getTotal()).toBe(700);
    });
});
