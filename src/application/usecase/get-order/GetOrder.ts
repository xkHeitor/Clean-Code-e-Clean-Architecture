import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import OrderRepository from "../../../domain/repository/OrderRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {
    
    private orderRepository: OrderRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.orderRepository = repositoryFactory.createOrderRepository();
    }

    async execute(code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.getByCode(code);
        const output = new GetOrderOutput(order.getTotal());
        return output;
    }

}