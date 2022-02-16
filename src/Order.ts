import Cpf from "./Cpf"
import { Item } from "./Item";
import OrderItem from "./OrderItem";

export default class Order {

    private cpf: Cpf;
    private orderItems: OrderItem[];

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
    }

    public addItems(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }

    public getTotal(): number {
        return this.orderItems.reduce((total, item) => total + item.getTotal(), 0);
    }

}