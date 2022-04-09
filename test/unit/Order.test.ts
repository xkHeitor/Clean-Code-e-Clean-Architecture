import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import Order from "../../src/domain/entity/Order";

describe("Order", () => {

    const cpfs = {
        valid: '111.444.777-35',
        invalid: '111.444.777-18',
    };

    const expiredCoupon = new Coupon('APP35', 35, new Date("2021-01-01T03:00:00"));
    const coupon = new Coupon('APP35', 35);
    const items = [
        { id: 1, category: 'Computadores', description: 'SSD', price: 250, quantity: 2, dimension: new Dimension(100, 30, 10), weight: 3 },
        { id: 2, category: 'Computadores', description: 'Mémoria', price: 100, quantity: 4, dimension: new Dimension(100, 50, 50), weight: 1 },
        { id: 3, category: 'Computadores', description: 'GPU', price: 3100, quantity: 1, dimension: new Dimension(10, 10, 10), weight: 20 },
    ];

    it("Shouldn't create an order with invalid CPF", () => {
        expect(() => new Order(cpfs.invalid)).toThrow(new Error('CPF Inválido'));
    });

    it("Should create an order with three items", () => {
        const order = new Order(cpfs.valid);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price), item.quantity);
        }
        expect(order.getTotal()).toBe(4000);
    });

    it("Should create an order with three items with a discount coupon", () => {
        const order = new Order(cpfs.valid);
        order.addCoupon(coupon);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price), item.quantity);
        }
        expect(order.getTotal()).toBe(2600);
    });

    it("Should create an order with three items with a expired discount coupon", () => {
        const order = new Order(cpfs.valid, new Date("2022-01-01T03:00:00"));
        order.addCoupon(expiredCoupon);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price), item.quantity);
        }
        expect(order.getTotal()).toBe(4000);
    });

    it("Should create an order with three items and calculate freight", () => {
        const order = new Order(cpfs.valid);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price, item.dimension, item.weight), item.quantity);
        }
        
        const freight = order.freight.getTotal(); 
        const total = order.getTotal() + freight;
        expect(total).toBe(4300);
    });

    it("Should create an order with three items and calculate the code of order", () => {
        const order = new Order(cpfs.valid, new Date("2021-03-01T10:00:00"), 1);
        for(const item of items) {
            order.addItems(new Item(item.id, item.category, item.description, item.price), item.quantity);
        }
        expect(order.code.value).toBe("202100000001");
    });

    it("should dont create a order with negative quantity", () => {
        const order = new Order(cpfs.valid);
        expect(() => order.addItems(new Item(1, "Computer", "CPU", 450), -3)).toThrow(new Error("Quantity must be positive"))
    });

    it("should dont create a order with duplicate item", () => {
        const order = new Order(cpfs.valid);
        const item = new Item(1, "Computer", "CPU", 450);
        order.addItems(item, 1);
        expect(() => order.addItems(item, 1)).toThrow(new Error("Duplicate item"))
    });

});