"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Freight {
    constructor() {
        this.DISTANCE = 1000;
        this.total = 0;
    }
    addItem(item, quantity) {
        this.total += (item.getVolume() * this.DISTANCE * (item.getDensity() / 100)) * quantity;
    }
    getTotal() {
        if (this.total > 10)
            return this.total;
        return 10;
    }
}
exports.default = Freight;
