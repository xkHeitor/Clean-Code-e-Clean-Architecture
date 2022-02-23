import Item from "./Item";

export default class Freight {

    private total: number
    private DISTANCE: number = 1000;

    constructor() {
        this.total = 0;
    }

    addItem(item: Item, quantity: number): void {
        this.total += (item.getVolume() * this.DISTANCE * (item.getDensity()/100)) * quantity;
    }

    getTotal(): number {
        if (this.total > 10)
            return this.total;
        return 10;
    }
}