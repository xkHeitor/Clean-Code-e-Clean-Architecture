"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(id, category, description, price, dimension, weight) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.price = price;
        this.dimension = dimension;
        this.weight = weight;
    }
    getVolume() {
        if (this.dimension)
            return this.dimension.getVolume();
        return 0;
    }
    getDensity() {
        if (this.weight && this.dimension)
            return this.weight / this.dimension.getVolume();
        return 0;
    }
}
exports.default = Item;
