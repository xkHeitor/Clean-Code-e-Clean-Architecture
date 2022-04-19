import StockEntry from "../../src/domain/entity/StockEntry";
import Connection from "../../src/infra/database/Connection";
import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import StockEntryRepositoryDatabase from "../../src/infra/repository/database/StockEntryRepositoryDatabase";

let connection: Connection

beforeEach(async () => {
    connection = new PostgresSQLConnectionAdapter();

});

describe("Stock Entry Repository", () => {

    it("Should save a stock entry", async () => {
        const stockEntryRepository = new StockEntryRepositoryDatabase(connection);
        await stockEntryRepository.clean();
        await stockEntryRepository.save(new StockEntry(1, "in", 6));
        await stockEntryRepository.save(new StockEntry(1, "out", 2));
        await stockEntryRepository.save(new StockEntry(1, "in", 2));
        const stockEntries = await stockEntryRepository.getAll(1);
        expect(stockEntries).toHaveLength(3);
    });

});

afterEach(() => connection.close());