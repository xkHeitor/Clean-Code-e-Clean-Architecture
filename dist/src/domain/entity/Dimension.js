"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Dimension {
    constructor(width, height, length) {
        this.width = width;
        this.height = height;
        this.length = length;
    }
    getVolume() {
        const unitOfMeasure = 100;
        return (this.width / unitOfMeasure) * (this.height / unitOfMeasure) * (this.length / unitOfMeasure);
    }
}
exports.default = Dimension;
