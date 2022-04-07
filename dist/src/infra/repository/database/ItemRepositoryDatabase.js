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
const Dimension_1 = __importDefault(require("../../../domain/entity/Dimension"));
const Item_1 = __importDefault(require("../../../domain/entity/Item"));
class ItemRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    getById(idItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const [itemData] = yield this.connection.query('select * from ccca.item where id_item = $1', [idItem]);
            const dimension = new Dimension_1.default(itemData.width, itemData.height, itemData.length);
            const item = new Item_1.default(itemData.id_item, itemData.category, itemData.description, itemData.price, dimension, itemData.weight);
            return item;
        });
    }
}
exports.default = ItemRepositoryDatabase;
