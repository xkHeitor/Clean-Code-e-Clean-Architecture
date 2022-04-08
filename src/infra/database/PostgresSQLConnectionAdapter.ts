import pgPromise from "pg-promise";
import Connection from "./Connection";

export default class PostgresSQLConnectionAdapter implements Connection {

    private connection: any;

    constructor(){
        this.connection = pgPromise()("postgres://postgres:123@localhost:5432/postgres")
    }

    async query(stmt: string, params: any = null): Promise<any> {
        return await this.connection.query(stmt, params);
    }

    async close(): Promise<void> {
        await this.connection.$pool.end();
    }

}