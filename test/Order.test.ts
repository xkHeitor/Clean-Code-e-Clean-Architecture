import Order from "../src/Order";

describe('Order', () => {

    it("Shouldn't create an order with invalid CPF", () => {
        expect(() => new Order("12.123.12300")).toThrow(new Error('CPF Inválido'));
    });

});