import SimulateFreight from "../../src/application/usecase/simulate-freight/SimulateFreight";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

describe('Simulate Freight', () => {
    
    it('Should simulate the freight of a order', async () => {
        const itemRepository = new ItemRepositoryMemory();
        const simulateFreight = new SimulateFreight(itemRepository);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        const simulateFreightOutput = simulateFreight.execute(input);
        expect(simulateFreightOutput.total).toBe(10)
    });

    it('Should simulate the freight of a order and break for item not found', async () => {
        const itemRepository = new ItemRepositoryMemory();
        const simulateFreight = new SimulateFreight(itemRepository);
        const input = {
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 0, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ]
        };
        expect(() => simulateFreight.execute(input)).toThrow(new Error("Item not found"));
    });

});