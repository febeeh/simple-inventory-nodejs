# Simple Inventory Management API (Node.js + PHP Template)

This is a simple Inventory Management RESTful API built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.  
It supports product management and inventory transaction tracking (sales, purchases, returns).  
Additionally, a PHP-based frontend template is available inside the `demo/` folder for testing and demonstration.

---

## 🚀 Getting Started

### 1. Clone the Repository

### 2. Install Dependencies
```sh
npm install
```

### 3. Set env
```bash
PORT=3000 # Port for the application
DB_URI= "MONGODB_URL_HERE" # MongoDB connection URI
NODE_ENV=development # Environment mode (development, production)
CORS_ORIGIN=http://localhost:3000 # Allowed CORS origin (eg: url,url)
```
* Replace the DB URI with your MongoDB connection string if different.

### 4. Start the Server
```bash
npm run dev
```

The server will start on: http://localhost:3000

---

## 🧪 API Endpoints

### Inventory

* ```POST /inventory/transaction```
Record a sale, return, or purchase.
Example:
```json
{
  "name": "Phone",
  "quantity": "2",
  "type": "purchase"
}
```

* ```GET /inventory/stock```
Fetch current stock level for all products.

### Product

* ```POST /product/insertProduct```
Add a new product.
Example:
```json
{ "name": "Test Product" }
```

* ```GET /product/getProducts```
Fetch all products.

---

## 💡 PHP Template (Demo Folder)

You'll find a PHP demo interface inside the demo/ folder to test the API easily from a browser:

### To Use:
#### 1: Make sure your Node.js server is running.
#### 12: Serve the demo/ folder via a local PHP server:

---

### Note: The PHP template communicates with the running Node.js API on localhost:3000. Ensure both are up.