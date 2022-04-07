"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
class PostgresSQLConnectionAdapter {
    constructor() {
        this.connection = (0, pg_promise_1.default)()("postgres://postgres:123@localhost:5432/postgres");
    }
    query(stmt, params = null) {
        return this.connection.query(stmt, params);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection.$pool.end();
        });
    }
}
exports.default = PostgresSQLConnectionAdapter;
