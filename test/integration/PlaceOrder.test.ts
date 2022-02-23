import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/usecase/PlaceOrder";

describe('Place Order', () => {

    it('Should place an order with discount coupon', () => {
        const itemRepository = new ItemRepositoryMemory();
        const orderRepository = new OrderRepositoryMemory();
        const CouponRepository = new CouponRepositoryMemory();
        const placeOrder = new PlaceOrder(itemRepository, orderRepository, CouponRepository);
        const placeOrderInput = {
            cpf: "111.444.777-35",
            orderItems: [
                { idItem: 1, quantity: 2 },
                { idItem: 2, quantity: 4 },
                { idItem: 3, quantity: 1 },
            ],
            coupon: "APP35"
        };
        const placeOrderOutput = placeOrder.execute(placeOrderInput);
        expect(placeOrderOutput.total).toBe(2600)
    });

});