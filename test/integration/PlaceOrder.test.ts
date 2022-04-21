import StockEntryHandler from "../../src/application/handler/StockEntryHandler";
import GetStock from "../../src/application/usecase/get-stock/GetStock";
import PlaceOrder from "../../src/application/usecase/place-order/PlaceOrder";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import Mediator from "../../src/infra/mediator/Mediator";

let connection: Connection;
let repositoryFactory: RepositoryFactory;
let orderRepository: OrderRepository;

beforeEach(async () => {
    connection = new PostgresSQLConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    orderRepository = repositoryFactory.createOrderRepository();
});

describe('Place Order', () => {

    it('Should place an order with discount coupon', async () => {
        await orderRepository.clean();
        const placeOrder = new PlaceOrder(repositoryFactory);
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
        const placeOrderOutput = await placeOrder.execute(placeOrderInput);
        expect(placeOrderOutput.total).toBe(2600)
    });

    it('Should place an order with discount coupon and calculate the code of order', async () => {
        await orderRepository.clean();
        const placeOrder = new PlaceOrder(repositoryFactory);
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
        await placeOrder.execute(placeOrderInput)
        const placeOrderOutput = await placeOrder.execute(placeOrderInput);
        expect(placeOrderOutput.code).toBe("202100000002");
    });

    it('Should place an order and remove stock items', async () => {
        await orderRepository.clean();
        const mediator = new Mediator();
        mediator.register(new StockEntryHandler(repositoryFactory));
        const placeOrder = new PlaceOrder(repositoryFactory, mediator);
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
        await placeOrder.execute(placeOrderInput);
        const getStock = new GetStock(repositoryFactory);
        const total1 = await getStock.execute(1);
        expect(total1).toBe(-2);
        const total2 = await getStock.execute(2);
        expect(total2).toBe(-4);
        const total3 = await getStock.execute(3);
        expect(total3).toBe(-1);
    });

});

afterEach(async () => {
    await connection.close();
});