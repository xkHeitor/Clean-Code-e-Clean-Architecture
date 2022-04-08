import Coupon from "../../../domain/entity/Coupon";
import Dimension from "../../../domain/entity/Dimension";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

    constructor(readonly connection: Connection) {}
    
    async getByCode(code: string): Promise<Order> {
        const [ orderData ] = await this.connection.query("select * from ccca.order where code = $1", [ code ]);
        if(!orderData) throw new Error("Order not found");
        const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence);
        const orderItemsData = await this.connection.query("select * from ccca.order_item where id_order = $1", [ orderData.id_order ]);
        for(const orderItemData of orderItemsData) {
            const [ itemData ] = await this.connection.query("select * from ccca.item where id_item = $1", [ orderItemData.id_item ]);
            const dimension = new Dimension(itemData.width, itemData.height, itemData.length);
            const item = new Item(itemData.id_item, itemData.category, itemData.description, parseFloat(itemData.price), dimension, itemData.weight);
            order.addItems(item, orderItemData.quantity);
        }
        if(orderData.coupon) {
            const [ couponData ] = await this.connection.query("select * from ccca.coupon where code = $1", [ orderData.coupon ]);
            const coupon = new Coupon(couponData.code, parseFloat(couponData.percentage), new Date(couponData.expire_date));
            order.addCoupon(coupon);
        }
        return order;
    }

    async save(order: Order): Promise<void> {
        const [ orderData ] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, coupon, freight, sequence, total) values ($1, $2, $3, $4, $5, $6, $7) returning *", 
        [ order.code.value, order.cpf.getValue(), order.orderDate, order?.coupon?.code, order.freight.getTotal(), order.sequence, order.getTotal() ]);
        for(const orderItem of order.orderItems) {
            await this.connection.query("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)", 
            [ orderData.id_order, orderItem.idItem, orderItem.price, orderItem.quantity ]);
        }
    }

    async count(): Promise<number> {
        const [ rows ] = await this.connection.query("select count(*):: int as count from ccca.order", []);
        return rows.count;
    }
    
    async clean(): Promise<void> {
        await this.connection.query("truncate ccca.order", []);
        await this.connection.query("truncate ccca.order_item", []);
    }

}