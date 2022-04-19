import StockEntry from "../../src/domain/entity/StockEntry";
import StockCalculator from "../../src/domain/service/StockCalculator";

describe("Stock calculator", () => {

    it("Should calculate a stock of item", () => {
        const calculator = new StockCalculator();
        const stockEntries = [
            new StockEntry(1, "in", 6),
            new StockEntry(1, "out", 2),
            new StockEntry(1, "in", 2),
        ];
        const total = calculator.calculate(stockEntries);
        expect(total).toBe(6);
    });

});