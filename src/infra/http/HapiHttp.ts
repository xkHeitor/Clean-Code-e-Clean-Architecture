import Hapi from '@hapi/hapi';
import Http from './Http';
export default class HapiHttp implements Http {
    server: Hapi.Server;

    constructor() {
        this.server = Hapi.server({});
    }

    async route(method: string, url: string, callback: any): Promise<any> {
        this.server.route({
            method,
            path: url,
            handler(request: any, h: any) {
                return callback(request.params, request.body);
            }
        });
    }

    async listen(port: number): Promise<void> {
        this.server.settings.port = port;
        await this.server.start();
    }
}