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
const SimulateFreight_1 = __importDefault(require("../../src/application/usecase/simulate-freight/SimulateFreight"));
const PostgresSQLConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PostgresSQLConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../src/infra/factory/DatabaseRepositoryFactory"));
let connection;
let repositoryFactory;
beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter_1.default();
    repositoryFactory = new DatabaseRepositoryFactory_1.default(connection);
});
describe('Simulate Freight', () => {
    it('Should simulate the freight of a order', () => __awaiter(void 0, void 0, void 0, function* () {
        const simulateFreight = new SimulateFreight_1.default(repositoryFactory);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        const simulateFreightOutput = yield simulateFreight.execute(input);
        expect(simulateFreightOutput.total).toBe(300);
    }));
    it('Should simulate the freight of a order and break for item not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const simulateFreight = new SimulateFreight_1.default(repositoryFactory);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 0, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () { return yield simulateFreight.execute(input); })).rejects.toThrow(new Error("Connection pool of the database object has been destroyed."));
    }));
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
