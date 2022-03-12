import PostgresSQLConnectionAdapter from "../../src/infra/database/PostgresSQLConnectionAdapter";

describe('Connection', () => {

    it('Should test connection with database', async () => {
        const connection = new PostgresSQLConnectionAdapter();
        const items = await connection.query('select * from ccca.item');
        expect(items).toHaveLength(3);
    });

});