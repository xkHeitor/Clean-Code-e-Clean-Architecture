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
const PostgresSQLConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PostgresSQLConnectionAdapter"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
describe('Item Repository Database', () => {
    it('Should test the repository of item', () => __awaiter(void 0, void 0, void 0, function* () {
        const connection = new PostgresSQLConnectionAdapter_1.default();
        const itemRepository = new ItemRepositoryDatabase_1.default(connection);
        const item = yield itemRepository.getById(1);
        expect(item === null || item === void 0 ? void 0 : item.description).toBe('SSD');
        yield connection.close();
    }));
});
