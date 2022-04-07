"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlaceOrderInput {
    constructor(cpf, orderItems, coupon, issueDate = new Date()) {
        this.cpf = cpf;
        this.orderItems = orderItems;
        this.coupon = coupon;
        this.issueDate = issueDate;
    }
}
exports.default = PlaceOrderInput;
