"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, percentage, expireDate) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
    }
    isExpired(today = new Date()) {
        if (!this.expireDate)
            return false;
        return this.expireDate.getTime() < today.getTime();
    }
    calculateDiscount(total) {
        return (total * this.percentage) / 100;
    }
}
exports.default = Coupon;
