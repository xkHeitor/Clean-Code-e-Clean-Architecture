import Dimension from "../src/Dimension";
import Item from "../src/Item";

describe('Item', () => {

    it('Should create a item with dimension and calculate volume', async () => {
        const item = new Item(1, 'Computadores', 'Gabinete', 450, new Dimension(100, 30, 10));
        const volume = item.getVolume();
        expect(volume).toBe(0.03);
    });

    it('Should create a item with dimension and calculate density', async () => {
        const item = new Item(1, 'Computadores', 'Gabinete', 450, new Dimension(100, 30, 10), 3);
        const volume = item.getDensity();
        expect(volume).toBe(100);
    });

});