import mongoose from "mongoose";
import "dotenv/config";

// This class is responsible for creating a new MongoDB connection using Mongoose.
class Database {
  public static makeNewConnection(uri: string) {
    console.log("uri: ", uri);
    const db = mongoose.createConnection(uri);

    db.on("error", (error) => {
      console.log(`MongoDB :: connection ${uri} ${JSON.stringify(error)}`);
      db.close().catch(() =>
        console.log(`MongoDB :: failed to close connection ${uri}`)
      );
    });

    db.on("connected", () => {
      mongoose.set("debug", function (col, method, query, doc) {
        console.log(
          `MongoDB :: ${col}.${method}(${JSON.stringify(
            query
          )},${JSON.stringify(doc)})`
        );
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
export const mongoConnection = Database.makeNewConnection(
  process.env.DB_URI!
).useDb("inventory");
