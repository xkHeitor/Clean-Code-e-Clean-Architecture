"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CouponRepositoryDatabase_1 = __importDefault(require("../repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../repository/database/ItemRepositoryDatabase"));
const OrderRepositoryMemory_1 = __importDefault(require("../repository/memory/OrderRepositoryMemory"));
class DatabaseRepositoryFactory {
    constructor(connection) {
        this.connection = connection;
    }
    createCouponRepository() {
        return new CouponRepositoryDatabase_1.default(this.connection);
    }
    createItemRepository() {
        return new ItemRepositoryDatabase_1.default(this.connection);
    }
    createOrderRepository() {
        return new OrderRepositoryMemory_1.default();
    }
}
exports.default = DatabaseRepositoryFactory;
