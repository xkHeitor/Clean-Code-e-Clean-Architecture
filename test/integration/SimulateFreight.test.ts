import SimulateFreight from "../../src/application/usecase/simulate-freight/SimulateFreight";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

let connection: Connection;
let itemRepository: ItemRepository;

beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter();
    itemRepository = new ItemRepositoryDatabase(connection);
});


describe('Simulate Freight', () => {
    
    it('Should simulate the freight of a order', async () => {
        const simulateFreight = new SimulateFreight(itemRepository);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        const simulateFreightOutput = await simulateFreight.execute(input);
        expect(simulateFreightOutput.total).toBe(300)
    });

    it('Should simulate the freight of a order and break for item not found', async () => {
        const simulateFreight = new SimulateFreight(itemRepository);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 0, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        expect(async () => await simulateFreight.execute(input)).rejects.toThrow(new Error("Connection pool of the database object has been destroyed."));
    });

});

afterEach(async () => {
    await connection.close();
});