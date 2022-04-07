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
const Freight_1 = __importDefault(require("../../../domain/entity/Freight"));
const SimulateFreightOutput_1 = __importDefault(require("./SimulateFreightOutput"));
class SimulateFreight {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.itemRepository = repositoryFactory.createItemRepository();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const freight = new Freight_1.default();
            for (const orderItem of input.orderItems) {
                const item = yield this.itemRepository.getById(orderItem.idItem);
                if (!item)
                    throw new Error("Item not found");
                freight.addItem(item, orderItem.quantity);
            }
            const output = new SimulateFreightOutput_1.default(freight.getTotal());
            return output;
        });
    }
}
exports.default = SimulateFreight;
