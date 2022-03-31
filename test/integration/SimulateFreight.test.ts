import SimulateFreight from "../../src/application/usecase/simulate-freight/SimulateFreight";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import Connection from "../../src/infra/database/Connection";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

let connection: Connection;
let repositoryFactory: RepositoryFactory;

beforeEach(() => {
    connection = new PostgresSQLConnectionAdapter();
    repositoryFactory = new DatabaseRepositoryFactory(connection);
});


describe('Simulate Freight', () => {
    
    it('Should simulate the freight of a order', async () => {
        const simulateFreight = new SimulateFreight(repositoryFactory);
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
        const simulateFreight = new SimulateFreight(repositoryFactory);
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