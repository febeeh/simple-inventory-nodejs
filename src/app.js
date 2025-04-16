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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_rate_limit_1 = require("express-rate-limit");
const app = (0, express_1.default)(); // Initialize Express application
exports.app = app;
const allowedCors = ((_a = process.env.CORS_ORIGIN) === null || _a === void 0 ? void 0 : _a.split(",")) || [
    "http://localhost:3000",
];
if (process.env.NODE_ENV === "production") { // Disable console logs in production
    console.log = () => { };
    console.error = () => { };
    console.debug = () => { };
}
// Rate limiting middleware to prevent abuse
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000, // 5 Minutes
    limit: 200, // Limit each IP to 200 requests per windowMs
    standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers.
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    requestWasSuccessful: (req, res) => res.statusCode < 400,
    message: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return ("You can only make 200 requests every 5 minutes." +
            req.headers["x-forwarded-for"] || req.connection.remoteAddress);
    }),
});
app.use((0, cors_1.default)({ origin: allowedCors, credentials: true })); // Initialize CORS with allowed origins
app.use(express_1.default.json()); // Parse JSON bodies
app.use("/inventory", limiter, inventory_routes_1.default); // Inventory routes
app.use("/product", limiter, product_routes_1.default); // Product routes
const server = require("http").createServer(app); // Create HTTP server
// Start the server and listen on the specified port
server.listen(process.env.PORT, function () {
    console.log(`Inventory nodejs service running in port ${process.env.PORT}`);
});
