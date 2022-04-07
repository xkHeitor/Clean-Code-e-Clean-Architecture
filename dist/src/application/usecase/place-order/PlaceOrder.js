"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../../domain/entity/Order"));
const PlaceOrderOutput_1 = __importDefault(require("./PlaceOrderOutput"));
class PlaceOrder {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.itemRepository = repositoryFactory.createItemRepository();
        this.couponRepository = repositoryFactory.createCouponRepository();
        this.orderRepository = repositoryFactory.createOrderRepository();
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const sequence = (yield this.orderRepository.count()) + 1;
            const order = new Order_1.default(input.cpf, input.issueDate, sequence);
            for (const orderItem of input.orderItems) {
                const item = yield this.itemRepository.getById(orderItem.idItem);
                if (!item)
                    throw new Error("Item not found");
                order.addItems(item, orderItem.quantity);
            }
            if (input.coupon) {
                const coupon = yield this.couponRepository.getByCode(input.coupon);
                if (coupon)
                    order.addCoupon(coupon);
            }
            this.orderRepository.save(order);
            const total = order.getTotal();
            const output = new PlaceOrderOutput_1.default(total, order.code.value);
            return output;
        });
    }
}
exports.default = PlaceOrder;
