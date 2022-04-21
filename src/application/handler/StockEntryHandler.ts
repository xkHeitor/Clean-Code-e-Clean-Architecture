import StockEntry from "../../domain/entity/StockEntry";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../domain/repository/StockRepository";
import Handler from "./Handler";
  
export default class StockEntryHandler implements Handler {
     
    readonly name = "OrderPlaced";
    readonly stockRepository: StockEntryRepository;

    constructor(readonly repositoryFactory: RepositoryFactory) {
        this.stockRepository = repositoryFactory.createStockEntryRepository();
    }

    async handle(event: OrderPlaced): Promise<void> {
        for(const orderItem of event.order.orderItems) {
            await this.stockRepository.save(
                new StockEntry(orderItem.idItem, "out", orderItem.quantity)
            );
        }
    }

}