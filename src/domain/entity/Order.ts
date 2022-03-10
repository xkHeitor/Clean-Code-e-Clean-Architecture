import Coupon from "./Coupon";
import Cpf from "./Cpf"
import Freight from "./Freight";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {

    private cpf: Cpf;
    private orderItems: OrderItem[];
    private coupon?: Coupon;
    public freight: Freight;
    readonly code: OrderCode;

    constructor(cpf: string, readonly orderDate: Date = new Date(), readonly sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = new Freight();
        this.code = new OrderCode(orderDate, sequence);
    }

    public addItems(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.id, item.price, quantity));
        this.freight.addItem(item, quantity);
    }

    public addCoupon(coupon: Coupon): void {
        if(!coupon.isExpired(this.orderDate))
            this.coupon = coupon;
    }

    public getTotal(): number {
        let total = this.orderItems.reduce((total, item) => total + item.getTotal(), 0);
        if (this.coupon) return total - this.coupon.calculateDiscount(total);
        return total;
    }

}