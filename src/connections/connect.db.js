"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
// This class is responsible for creating a new MongoDB connection using Mongoose.
class Database {
    static makeNewConnection(uri) {
        console.log("uri: ", uri);
        const db = mongoose_1.default.createConnection(uri);
        db.on("error", (error) => {
            console.log(`MongoDB :: connection ${uri} ${JSON.stringify(error)}`);
            db.close().catch(() => console.log(`MongoDB :: failed to close connection ${uri}`));
        });
        db.on("connected", () => {
            mongoose_1.default.set("debug", function (col, method, query, doc) {
                console.log(`MongoDB :: ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
            });
            console.log(`MongoDB :: connected to ${uri}`);
        });
        db.on("disconnected", () => {
            console.log(`MongoDB :: disconnected ${uri}`);
        });
        return db;
    }
}
// This is the MongoDB connection for the inventory database using the URI from environment variables.
exports.mongoConnection = Database.makeNewConnection(process.env.DB_URI).useDb("inventory");
