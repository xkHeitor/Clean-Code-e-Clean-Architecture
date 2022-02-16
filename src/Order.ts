import { Coupon } from "./Coupon";
import Cpf from "./Cpf"
import { Item } from "./Item";
import OrderItem from "./OrderItem";

export default class Order {

    private cpf: Cpf;
    private orderItems: OrderItem[];
    private coupon?: Coupon;

    constructor(cpf: string) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
    }

    public addItems(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
    }

    public addCoupon(coupon: Coupon): void {
        this.coupon = coupon;
    }

    public getTotal(): number {
        let total = this.orderItems.reduce((total, item) => total + item.getTotal(), 0);
        if (this.coupon) return ((total * this.coupon.percentage) / 100);
        return total;
    }

}