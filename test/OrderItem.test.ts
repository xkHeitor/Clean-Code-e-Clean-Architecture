import OrderItem from "../src/OrderItem";

describe("OrderItem", () => {

    const fakeOrderItem = { idItem: 1, price: 350, quantity: 2 };

    it("Should get total", () => {
        const orderItem = new OrderItem(fakeOrderItem.idItem, fakeOrderItem.price, fakeOrderItem.quantity);
        expect(orderItem.getTotal()).toBe(700);
    });

});