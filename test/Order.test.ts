import Order from "../src/Order";

describe("Order", () => {

    const cpfs = {
        valid: '111.444.777-35',
        invalid: '111.444.777-18',
    };

    const coupon = { code: 'APP35', percentage: 35 };
    const items = [
        { data: { id: 1, category: 'Computadores', description: 'SSD', price: 250 }, quantity: 2 },
        { data: {id: 2, category: 'Computadores', description: 'Mémoria', price: 100 }, quantity: 4 },
        { data: {id: 3, category: 'Computadores', description: 'GPU', price: 3100 }, quantity: 1 },
    ];

    it("Shouldn't create an order with invalid CPF", () => {
        expect(() => new Order(cpfs.invalid)).toThrow(new Error('CPF Inválido'));
    });

    it("Should create an order with three items", () => {
        const order = new Order(cpfs.valid);
        for(const item of items) {
            order.addItems(item.data, item.quantity);
        }
        expect(order.getTotal()).toBe(4000);
    });

    it("Should create an order with three items with a discount coupon", () => {
        const order = new Order(cpfs.valid);
        order.addCoupon(coupon);
        for(const item of items) {
            order.addItems(item.data, item.quantity);
        }
        expect(order.getTotal()).toBe(2600);
    });

});