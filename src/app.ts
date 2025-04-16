import express from "express";
import invetoryRoutes from "./routes/inventory.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

const app = express(); // Initialize Express application
const allowedCors = process.env.CORS_ORIGIN?.split(",") || [ // Default allowed origins
  "http://localhost:3000",
];

if (process.env.NODE_ENV === "production") { // Disable console logs in production
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// Rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 Minutes
  limit: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: "draft-7", // Return rate limit info in the `RateLimit-*` headers.
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  requestWasSuccessful: (req, res) => res.statusCode < 400,
  message: async (req: any, res: any) => {
    return (
      "You can only make 200 requests every 5 minutes." +
        req.headers["x-forwarded-for"] || req.connection.remoteAddress
    );
  },
});

app.use(cors({ origin: allowedCors, credentials: true })); // Initialize CORS with allowed origins
app.use(express.json()); // Parse JSON bodies

app.use("/inventory", limiter, invetoryRoutes); // Inventory routes
app.use("/product", limiter, productRoutes); // Product routes

const server = require("http").createServer(app); // Create HTTP server

// Start the server and listen on the specified port
server.listen(process.env.PORT, function () {
  console.log(`Inventory nodejs service running in port ${process.env.PORT}`);
});

export { app };
