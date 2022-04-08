import Dimension from "../../../domain/entity/Dimension";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {

    private items: Item[];

    constructor() {
        this.items = [
            new Item(1, 'Computadores','SSD', 250, new Dimension(100, 30, 10), 3),
            new Item(2, 'Computadores','Mémoria', 100, new Dimension(50, 50, 50), 1),
            new Item(3, 'Computadores','GPU', 3100, new Dimension(10, 10, 10), 20),
        ];
    }

    async getById(idItem: number): Promise<Item|undefined> {
        return this.items.find(item => item.id === idItem);
    }
}