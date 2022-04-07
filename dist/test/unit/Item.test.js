"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dimension_1 = __importDefault(require("../../src/domain/entity/Dimension"));
const Item_1 = __importDefault(require("../../src/domain/entity/Item"));
describe('Item', () => {
    it('Should create a item with dimension and calculate volume', () => __awaiter(void 0, void 0, void 0, function* () {
        const item = new Item_1.default(1, 'Computadores', 'Gabinete', 450, new Dimension_1.default(100, 30, 10));
        const volume = item.getVolume();
        expect(volume).toBe(0.03);
    }));
    it('Should create a item with dimension and calculate density', () => __awaiter(void 0, void 0, void 0, function* () {
        const item = new Item_1.default(1, 'Computadores', 'Gabinete', 450, new Dimension_1.default(100, 30, 10), 3);
        const volume = item.getDensity();
        expect(volume).toBe(100);
    }));
});
