import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrderOutput from "../get-order/GetOrderOutput";

export default class GetOrders {
    
    private orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(): Promise<GetOrderOutput[]> {
        const orders = await this.orderRepository.getAll();
        const output = orders.map(order => new GetOrderOutput(order.getTotal()));
        return output;
    }

}