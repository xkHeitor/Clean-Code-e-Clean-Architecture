import GetOrder from "../../src/application/usecase/get-order/GetOrder";
import PlaceOrder from "../../src/application/usecase/place-order/PlaceOrder";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(async () => {
    connection = new PostgresSQLConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
});


describe("Get Order", () => {

    it("should get a order by code", async () => {
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
        const getOrder = new GetOrder(repositoryFactory);
        const output = await getOrder.execute(placeOrderOutput.code);
        expect(output.total).toBe(2600);
    });

});

afterEach(async () => {
    await connection.close();
});