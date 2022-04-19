import Connection from "../../infra/database/Connection";
import GetOrderOutput from "../usecase/get-order/GetOrderOutput";

export default class GetOrderQuery {

    constructor(readonly connection: Connection) {}

    async execute(code: string): Promise<GetOrderOutput> {
        const [ orderData ] = await this.connection.query("select ir_order, total from ccca.order where code = $1", [ code ]);
        const itemsData = await this.connection.query("select description, price from ccca.order_item join ccca.item using (id_item), where id_order = $1", [ orderData.ir_order ]);
        const output = new GetOrderOutput(orderData.total, itemsData);
        return output;
    }

}