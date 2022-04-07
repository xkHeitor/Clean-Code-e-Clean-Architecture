"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCode {
    constructor(date, sequence) {
        this.value = this.generateCode(date, sequence);
    }
    generateCode(date, sequence) {
        const year = date.getFullYear();
        const completeTheSequence = (new String(sequence)).padStart(8, "0");
        return `${year}${completeTheSequence}`;
    }
}
exports.default = OrderCode;
