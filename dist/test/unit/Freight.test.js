"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dimension_1 = __importDefault(require("../../src/domain/entity/Dimension"));
const Freight_1 = __importDefault(require("../../src/domain/entity/Freight"));
const Item_1 = __importDefault(require("../../src/domain/entity/Item"));
describe('Freight', () => {
    it('Should calculate the freight of the item', () => {
        const item = new Item_1.default(1, 'Computadores', 'Cooler', 400, new Dimension_1.default(100, 30, 10), 3);
        const freight = new Freight_1.default();
        freight.addItem(item, 2);
        expect(freight.getTotal()).toBe(60);
    });
    it('Should calculate the minimum freight of the item', () => {
        const item = new Item_1.default(1, 'Computadores', 'Cooler', 30, new Dimension_1.default(10, 10, 10), 0.9);
        const freight = new Freight_1.default();
        freight.addItem(item, 1);
        expect(freight.getTotal()).toBe(10);
    });
});
