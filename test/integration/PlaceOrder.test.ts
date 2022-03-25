import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/usecase/place-order/PlaceOrder";
import Connection from "../../src/infra/database/Connection";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

let connection: Connection;
let orderRepository: OrderRepository;
let itemRepository: ItemRepository;
let couponRepository: CouponRepository;

beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter();
    orderRepository = new OrderRepositoryMemory();
    itemRepository = new ItemRepositoryDatabase(connection);
    couponRepository = new CouponRepositoryDatabase(connection);
});

describe('Place Order', () => {

    it('Should place an order with discount coupon', async () => {
        const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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
        const placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
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

});

afterEach(async () => {
    await connection.close();
});