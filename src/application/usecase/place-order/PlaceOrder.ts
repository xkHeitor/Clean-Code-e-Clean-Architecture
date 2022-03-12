import ItemRepository from "../../../domain/repository/ItemRepository";
import Order from "../../../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import OrderRepository from "../../../domain/repository/OrderRepository";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class PlaceOrder {

    constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly couponRepository: CouponRepository) {}

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        for (const orderItem of input.orderItems) {
            const item = await this.itemRepository.getById(orderItem.idItem);
            if(!item) throw new Error("Item not found");
            order.addItems(item, orderItem.quantity);
        }

        if(input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if(coupon) order.addCoupon(coupon);
        }
        
        this.orderRepository.save(order);
        const total = order.getTotal();
        const output = new PlaceOrderOutput(total, order.code.value);
        return output;
    }

}