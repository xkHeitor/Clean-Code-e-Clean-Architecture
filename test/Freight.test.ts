import Dimension from "../src/Dimension";
import Freight from "../src/Freight";
import Item from "../src/Item";

describe('Freight', () => {

    it('Should calculate the freight of the item', () => {
        const item = new Item(1, 'Computadores', 'Cooler', 400, new Dimension(100, 30, 10), 3);
        const freight = new Freight();
        freight.addItem(item, 2);
        expect(freight.getTotal()).toBe(60);
    });

    it('Should calculate the minimum freight of the item', () => {
        const item = new Item(1, 'Computadores', 'Cooler', 30, new Dimension(10, 10, 10), 0.9);
        const freight = new Freight();
        freight.addItem(item, 1);
        expect(freight.getTotal()).toBe(10);
    });

});