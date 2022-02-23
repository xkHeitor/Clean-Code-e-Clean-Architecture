import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {

    private items: Item[];

    constructor() {
        this.items = [
            new Item(1, 'Computadores','SSD', 250),
            new Item(2, 'Computadores','Mémoria', 100),
            new Item(3, 'Computadores','GPU', 3100),  
        ];
    }

    getById(idItem: number): Item|undefined {
        return this.items.find(item => item.id === idItem);
    }
}