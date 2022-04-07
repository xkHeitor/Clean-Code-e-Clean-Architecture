"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const Freight_1 = __importDefault(require("./Freight"));
const OrderCode_1 = __importDefault(require("./OrderCode"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf, orderDate = new Date(), sequence = 1) {
        this.orderDate = orderDate;
        this.sequence = sequence;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freight = new Freight_1.default();
        this.code = new OrderCode_1.default(orderDate, sequence);
    }
    addItems(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.id, item.price, quantity));
        this.freight.addItem(item, quantity);
    }
    addCoupon(coupon) {
        if (!coupon.isExpired(this.orderDate))
            this.coupon = coupon;
    }
    getTotal() {
        let total = this.orderItems.reduce((total, item) => total + item.getTotal(), 0);
        if (this.coupon)
            return total - this.coupon.calculateDiscount(total);
        return total;
    }
}
exports.default = Order;
