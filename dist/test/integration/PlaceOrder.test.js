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
const PlaceOrder_1 = __importDefault(require("../../src/application/usecase/place-order/PlaceOrder"));
const PostgresSQLConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PostgresSQLConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../src/infra/factory/DatabaseRepositoryFactory"));
let connection;
let repositoryFactory;
beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter_1.default();
    repositoryFactory = new DatabaseRepositoryFactory_1.default(connection);
});
describe('Place Order', () => {
    it('Should place an order with discount coupon', () => __awaiter(void 0, void 0, void 0, function* () {
        const placeOrder = new PlaceOrder_1.default(repositoryFactory);
        const placeOrderInput = {
            cpf: "111.444.777-35",
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ],
            coupon: "APP35",
            issueDate: new Date("2021-03-01T10:00:00")
        };
        const placeOrderOutput = yield placeOrder.execute(placeOrderInput);
        expect(placeOrderOutput.total).toBe(3200);
    }));
    it('Should place an order with discount coupon and calculate the code of order', () => __awaiter(void 0, void 0, void 0, function* () {
        const placeOrder = new PlaceOrder_1.default(repositoryFactory);
        const placeOrderInput = {
            cpf: "111.444.777-35",
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ],
            coupon: "APP35",
            issueDate: new Date("2021-03-01T10:00:00")
        };
        yield placeOrder.execute(placeOrderInput);
        const placeOrderOutput = yield placeOrder.execute(placeOrderInput);
        expect(placeOrderOutput.code).toBe("202100000002");
    }));
});
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection.close();
}));
