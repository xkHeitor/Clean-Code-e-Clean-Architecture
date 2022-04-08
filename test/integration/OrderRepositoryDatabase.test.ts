import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";

let connection: Connection;
let orderRepository: OrderRepository;

beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter();
});

const cpf = '111.444.777-35';
const coupon = new Coupon('APP35', 35);
const items = [
    { id: 1, category: 'Computadores', description: 'SSD', price: 250, quantity: 2, dimension: new Dimension(100, 30, 10), weight: 3 },
    { id: 2, category: 'Computadores', description: 'Mémoria', price: 100, quantity: 4, dimension: new Dimension(50, 50, 50), weight: 1 },
    { id: 3, category: 'Computadores', description: 'GPU', price: 3100, quantity: 1, dimension: new Dimension(10, 10, 10), weight: 20 },
];


describe("Order repository", () => {
    
    it("should save a order", async () => {
        // orderRepository = new OrderRepositoryMemory();
        orderRepository = new OrderRepositoryDatabase(connection);
        await orderRepository.clean();
        const order = new Order(cpf, new Date("2021-04-01T10:00:00"), 1);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price, item.dimension, item.weight), item.quantity);
        }
        order.addCoupon(coupon);
        await orderRepository.save(order);
        const rows = await orderRepository.count();
        expect(rows).toBe(1);
        const savedOrder = await orderRepository.getByCode(order.code.value);
        expect(savedOrder.getTotal()).toBe(2600);
        expect(savedOrder.freight.getTotal()).toBe(300);
    });

});

afterEach(async () => {
    await connection.close();
});