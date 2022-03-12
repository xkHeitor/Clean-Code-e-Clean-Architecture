import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";

describe('Item Repository Database', () => {

    it('Should test the repository of item', async () => {
        const connection = new PostgresSQLConnectionAdapter();
        const itemRepository = new ItemRepositoryDatabase(connection);
        const item = await itemRepository.getById(1);
        expect(item?.description).toBe('SSD');
        await connection.close();
    });

});