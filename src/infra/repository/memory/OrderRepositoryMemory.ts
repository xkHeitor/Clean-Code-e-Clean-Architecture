import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {

    private orders: Order[];
    
    constructor() {
        this.orders = [];
    }
    
    async getByCode(code: string): Promise<Order> {
        const order = this.orders.find(order => order.code.value === code);
        if(!order) throw new Error("Order not found");
        return order;
    }

    async save(order: Order): Promise<void> {
        this.orders.push(order);
    }

    async count(): Promise<number> {
        return this.orders.length;
    }

    async clean(): Promise<void> {
        this.orders = [];
    }

}