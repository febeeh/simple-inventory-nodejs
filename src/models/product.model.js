"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect_db_1 = require("../connections/connect.db");
// Schema for Product
const ProductScheme = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } });
const getModel = () => {
    const ProductModel = connect_db_1.mongoConnection.model("products", ProductScheme);
    return ProductModel;
};
exports.getModel = getModel;
