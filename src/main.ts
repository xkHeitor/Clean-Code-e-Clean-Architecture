import HapiHttp from "./infra/http/HapiHttp";
import ExpressHttp from "./infra/http/ExpressHttp";
import PostgresSQLConnectionAdapter from "./infra/database/PostgresSQLConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import Router from "./infra/http/Router";

const port = 3002;
const connection = new PostgresSQLConnectionAdapter();
const repositoryFactory = new DatabaseRepositoryFactory(connection);
const http = new ExpressHttp();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(port);
console.info(`${port} Online`);